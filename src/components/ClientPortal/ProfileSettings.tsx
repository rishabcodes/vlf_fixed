'use client';

import React, { useState, useEffect } from 'react';
import { securityLogger } from '@/lib/safe-logger';

import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Smartphone,
  Eye,
  EyeOff,
  LogOut,
  Shield,
  Bell,
  Globe,
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    language: string;
    communicationMethod: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    appointmentReminders: boolean;
    caseUpdates: boolean;
    newsletterSubscribed: boolean;
  };
  twoFactorEnabled: boolean;
  profileImage?: string;
}

interface ExtendedClientData extends ClientData {
  firstName?: string;
  lastName?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences?: {
    language: string;
    communicationMethod: string;
    emailNotifications: boolean;
    smsNotifications: boolean;
    appointmentReminders: boolean;
    caseUpdates: boolean;
    newsletterSubscribed: boolean;
  };
  twoFactorEnabled?: boolean;
  profileImage?: string;
}

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function ProfileSettings({ clientData }: { clientData: ExtendedClientData }) {
  const { data: session, update } = useSession();
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    preferences: {
      language: 'en',
      communicationMethod: 'email',
      emailNotifications: true,
      smsNotifications: false,
      appointmentReminders: true,
      caseUpdates: true,
      newsletterSubscribed: false,
    },
    twoFactorEnabled: false,
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: User },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  useEffect(() => {
    if (clientData) {
      setProfileData({
        firstName: clientData.firstName || '',
        lastName: clientData.lastName || '',
        email: clientData.email || '',
        phone: clientData.phone || '',
        address: clientData.address || {
          street: '',
          city: '',
          state: '',
          zip: '',
        },
        emergencyContact: clientData.emergencyContact || {
          name: '',
          phone: '',
          relationship: '',
        },
        preferences: clientData.preferences || {
          language: 'en',
          communicationMethod: 'email',
          emailNotifications: true,
          smsNotifications: false,
          appointmentReminders: true,
          caseUpdates: true,
          newsletterSubscribed: false,
        },
        twoFactorEnabled: clientData.twoFactorEnabled || false,
        profileImage: clientData.profileImage,
      });
    }
  }, [clientData]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const response = await fetch('/api/client/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setEditing(false);
        // Update session if email changed
        if (profileData.email !== session?.user?.email) {
          await update({ email: profileData.email });
        }
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      securityLogger.error('Error saving profile:', error);
    } finally {
      setSaving(false);
        }
};

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/client/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      if (response.ok) {
        setChangePassword(false);
        setPasswords({ current: '', new: '', confirm: '' });
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('Failed to change password. Please check your current password.');
      }
    } catch (error) {
      securityLogger.error('Error changing password:', error);
        }
};

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/client/profile/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { imageUrl } = await response.json();
        setProfileData({ ...profileData, profileImage: imageUrl });
      }
    } catch (error) {
      securityLogger.error('Error uploading image:', error);
        }
};

  const toggle2FA = async () => {
    try {
      const response = await fetch('/api/client/2fa/toggle', {
        method: 'POST',
      });

      if (response.ok) {
        setProfileData({ ...profileData, twoFactorEnabled: !profileData.twoFactorEnabled });
      }
    } catch (error) {
      securityLogger.error('Error toggling 2FA:', error);
        }
};

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        {saveSuccess && (
          <div
className="flex items-center gap-2 text-green-600"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Changes saved successfully!</span>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border p-1">
        <div className="flex space-x-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}

                onClick={() => setActiveTab(tab.id)}

                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#6B1F2E] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Personal Information Tab */}
      {activeTab === 'personal' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <p className="text-sm text-gray-600 mt-1">
                Update your personal details and contact information
              </p>
            </div>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}

                className="px-4 py-2 text-[#6B1F2E] hover:bg-[#6B1F2E] hover:text-white border border-[#6B1F2E] rounded-lg transition-colors"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}

                className="px-4 py-2 text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
      disabled={saving} className="px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {profileData.profileImage ? (
                  <Image
                    src={profileData.profileImage}

                alt="Profile"
                    width={96}
                    height={96}

                className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              {editing && (
                <label className="absolute bottom-0 right-0 p-2 bg-[#6B1F2E] text-white rounded-full cursor-pointer hover:bg-[#8B2635] transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h4>
              <p className="text-sm text-gray-600">{profileData.email}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={e => setProfileData({ ...profileData, firstName: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={e => setProfileData({ ...profileData, lastName: e.target.value })}
                disabled={!editing}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!editing}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!editing}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={profileData.address.street} onChange={e =>
                      setProfileData({
                        ...profileData,
                        address: { ...profileData.address, street: e.target.value },
                      })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <input
                  type="text"
                  placeholder="City"
                  value={profileData.address.city} onChange={e =>
                    setProfileData({
                      ...profileData,
                      address: { ...profileData.address, city: e.target.value },
                    })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="State"
                    value={profileData.address.state} onChange={e =>
                      setProfileData({
                        ...profileData,
                        address: { ...profileData.address, state: e.target.value },
                      })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={profileData.address.zip} onChange={e =>
                      setProfileData({
                        ...profileData,
                        address: { ...profileData.address, zip: e.target.value },
                      })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-medium text-gray-900 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={profileData.emergencyContact.name} onChange={e =>
                    setProfileData({
                      ...profileData,
                      emergencyContact: { ...profileData.emergencyContact, name: e.target.value },
                    })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={profileData.emergencyContact.phone} onChange={e =>
                    setProfileData({
                      ...profileData,
                      emergencyContact: { ...profileData.emergencyContact, phone: e.target.value },
                    })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={profileData.emergencyContact.relationship} onChange={e =>
                    setProfileData({
                      ...profileData,
                      emergencyContact: {
                        ...profileData.emergencyContact,
                        relationship: e.target.value,
                      },
                    })}
                  disabled={!editing}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Password Change */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Password</h3>
                <p className="text-sm text-gray-600 mt-1">Ensure your account stays secure</p>
              </div>
              {!changePassword && (
                <button
                  onClick={() => setChangePassword(true)}

                className="text-[#6B1F2E] hover:text-[#8B2635] font-medium flex items-center gap-2"
                >
                  Change Password
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {changePassword && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwords.current}
                      onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full pr-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, current: !showPasswords.current })}

                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwords.new}
                      onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full pr-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, new: !showPasswords.new })}

                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwords.confirm}
                      onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full pr-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}

                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setChangePassword(false);
                      setPasswords({ current: '', new: '', confirm: '' });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    className="flex-1 px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add an extra layer of security to your account by enabling two-factor
                  authentication
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={toggle2FA} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    profileData.twoFactorEnabled ? 'bg-[#6B1F2E]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      profileData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
            {profileData.twoFactorEnabled && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Two-factor authentication is enabled</span>
                </div>
              </div>
            )}
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Current Session</p>
                    <p className="text-sm text-gray-600">Chrome on Windows • Charlotte, NC</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">Active now</span>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}

                className="mt-4 text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out of all devices
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
              <div className="space-y-3">
                {[
                  { key: 'emailNotifications', label: 'Enable email notifications' },
                  { key: 'appointmentReminders', label: 'Appointment reminders' },
                  { key: 'caseUpdates', label: 'Case updates and milestones' },
                  { key: 'newsletterSubscribed', label: 'Firm newsletter and legal updates' },
                ].map(item => (
                  <label
                    key={item.key}

                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <span
                className="text-gray-700">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={
                        profileData.preferences[
                          item.key as keyof typeof profileData.preferences
                        ] as boolean} onChange={e =>
                        setProfileData({
                          ...profileData,
                          preferences: {
                            ...profileData.preferences,
                            [item.key]: e.target.checked,
                          },
                        })}
                      className="w-4 h-4 text-[#6B1F2E] rounded focus:ring-[#6B1F2E]"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4">SMS Notifications</h4>
              <label className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div>
                  <span className="text-gray-700">Enable SMS notifications</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Receive important updates via text message
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.preferences.smsNotifications} onChange={e =>
                    setProfileData({
                      ...profileData,
                      preferences: {
                        ...profileData.preferences,
                        smsNotifications: e.target.checked,
                      },
                    })}
                  className="w-4 h-4 text-[#6B1F2E] rounded focus:ring-[#6B1F2E]"
                />
              </label>
            </div>

            <button
              onClick={handleSaveProfile}
      disabled={saving} className="w-full px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Notification Preferences'}
            </button>
          </div>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Communication Preferences</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Language
              </label>
              <select
                value={profileData.preferences.language} onChange={e =>
                  setProfileData({
                    ...profileData,
                    preferences: {
                      ...profileData.preferences,
                      language: e.target.value,
                    },
                  })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6B1F2E] focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Communication Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'email', label: 'Email', icon: Mail },
                  { value: 'phone', label: 'Phone', icon: Phone },
                  { value: 'sms', label: 'SMS', icon: Smartphone },
                ].map(method => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.value}

                onClick={() =>
                        setProfileData({
                          ...profileData,
                          preferences: {
                            ...profileData.preferences,
                            communicationMethod: method.value,
                          },
                        })}

                className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
                        profileData.preferences.communicationMethod === method.value
                          ? 'border-[#6B1F2E] bg-[#6B1F2E] bg-current/5'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          profileData.preferences.communicationMethod === method.value
                            ? 'text-[#6B1F2E]'
                            : 'text-gray-600'
                        }`}
                      />
                      <span
                        className={
                          profileData.preferences.communicationMethod === method.value
                            ? 'text-[#6B1F2E] font-medium'
                            : 'text-gray-700'
                        }
                      >
                        {method.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Privacy Notice</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Your preferences are used to provide you with the best possible service. We will
                    never share your personal information without your consent.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
      disabled={saving} className="w-full px-4 py-2 bg-[#6B1F2E] text-white rounded-lg hover:bg-[#8B2635] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
