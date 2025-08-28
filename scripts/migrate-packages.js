#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Icon mappings from heroicons/react-icons to lucide-react
const iconMappings = {
  // Heroicons mappings
  'ChevronDownIcon': 'ChevronDown',
  'ChevronUpIcon': 'ChevronUp',
  'ChevronLeftIcon': 'ChevronLeft',
  'ChevronRightIcon': 'ChevronRight',
  'XMarkIcon': 'X',
  'Bars3Icon': 'Menu',
  'MagnifyingGlassIcon': 'Search',
  'HomeIcon': 'Home',
  'UserIcon': 'User',
  'PhoneIcon': 'Phone',
  'EnvelopeIcon': 'Mail',
  'MapPinIcon': 'MapPin',
  'CalendarIcon': 'Calendar',
  'ClockIcon': 'Clock',
  'CheckIcon': 'Check',
  'ExclamationTriangleIcon': 'AlertTriangle',
  'InformationCircleIcon': 'Info',
  'ArrowRightIcon': 'ArrowRight',
  'ArrowLeftIcon': 'ArrowLeft',
  'StarIcon': 'Star',
  'HeartIcon': 'Heart',
  'ShareIcon': 'Share',
  'DocumentIcon': 'FileText',
  'DownloadIcon': 'Download',
  'UploadIcon': 'Upload',
  'PencilIcon': 'Edit',
  'TrashIcon': 'Trash',
  'CogIcon': 'Settings',
  'BellIcon': 'Bell',
  'EyeIcon': 'Eye',
  'EyeSlashIcon': 'EyeOff',
  'LockClosedIcon': 'Lock',
  'LockOpenIcon': 'Unlock',
  'ShieldCheckIcon': 'Shield',
  'GlobeAltIcon': 'Globe',
  'ComputerDesktopIcon': 'Monitor',
  'DevicePhoneMobileIcon': 'Smartphone',
  'BuildingOfficeIcon': 'Building',
  'BriefcaseIcon': 'Briefcase',
  'ScaleIcon': 'Scale',
  'AcademicCapIcon': 'GraduationCap',
  'BookOpenIcon': 'BookOpen',
  'ChatBubbleLeftRightIcon': 'MessageSquare',
  'MicrophoneIcon': 'Mic',
  'VideoCameraIcon': 'Video',
  'PaperAirplaneIcon': 'Send',
  
  // React Icons mappings
  'FaPhone': 'Phone',
  'FaEnvelope': 'Mail',
  'FaMapMarkerAlt': 'MapPin',
  'FaCalendar': 'Calendar',
  'FaClock': 'Clock',
  'FaCheck': 'Check',
  'FaTimes': 'X',
  'FaChevronDown': 'ChevronDown',
  'FaChevronUp': 'ChevronUp',
  'FaChevronLeft': 'ChevronLeft',
  'FaChevronRight': 'ChevronRight',
  'FaArrowRight': 'ArrowRight',
  'FaArrowLeft': 'ArrowLeft',
  'FaStar': 'Star',
  'FaHeart': 'Heart',
  'FaShare': 'Share',
  'FaDownload': 'Download',
  'FaUpload': 'Upload',
  'FaEdit': 'Edit',
  'FaTrash': 'Trash',
  'FaCog': 'Settings',
  'FaBell': 'Bell',
  'FaEye': 'Eye',
  'FaEyeSlash': 'EyeOff',
  'FaLock': 'Lock',
  'FaUnlock': 'Unlock',
  'FaShieldAlt': 'Shield',
  'FaGlobe': 'Globe',
  'FaDesktop': 'Monitor',
  'FaMobile': 'Smartphone',
  'FaBuilding': 'Building',
  'FaBriefcase': 'Briefcase',
  'FaBalanceScale': 'Scale',
  'FaGraduationCap': 'GraduationCap',
  'FaBook': 'Book',
  'FaComments': 'MessageSquare',
  'FaMicrophone': 'Mic',
  'FaVideo': 'Video',
  'FaPaperPlane': 'Send',
  'FaUser': 'User',
  'FaUsers': 'Users',
  'FaHome': 'Home',
  'FaSearch': 'Search',
  'FaBars': 'Menu',
  'FaFacebook': 'Facebook',
  'FaTwitter': 'Twitter',
  'FaLinkedin': 'Linkedin',
  'FaInstagram': 'Instagram',
  'FaYoutube': 'Youtube',
  'FaGithub': 'Github',
  'HiHome': 'Home',
  'HiUser': 'User',
  'HiPhone': 'Phone',
  'HiMail': 'Mail',
  'HiLocationMarker': 'MapPin',
  'HiCalendar': 'Calendar',
  'HiClock': 'Clock',
  'HiCheck': 'Check',
  'HiX': 'X',
  'HiChevronDown': 'ChevronDown',
  'HiChevronUp': 'ChevronUp',
  'HiChevronLeft': 'ChevronLeft',
  'HiChevronRight': 'ChevronRight',
  'HiArrowRight': 'ArrowRight',
  'HiArrowLeft': 'ArrowLeft',
  'HiStar': 'Star',
  'HiHeart': 'Heart',
  'HiShare': 'Share',
  'HiDownload': 'Download',
  'HiUpload': 'Upload',
  'HiPencil': 'Edit',
  'HiTrash': 'Trash',
  'HiCog': 'Settings',
  'HiBell': 'Bell',
  'HiEye': 'Eye',
  'HiEyeOff': 'EyeOff',
  'HiLockClosed': 'Lock',
  'HiLockOpen': 'Unlock',
  'HiShieldCheck': 'Shield',
  'HiGlobe': 'Globe',
  'HiDesktopComputer': 'Monitor',
  'HiDeviceMobile': 'Smartphone',
  'HiOfficeBuilding': 'Building',
  'HiBriefcase': 'Briefcase',
  'HiScale': 'Scale',
  'HiAcademicCap': 'GraduationCap',
  'HiBookOpen': 'BookOpen',
  'HiChat': 'MessageSquare',
  'HiMicrophone': 'Mic',
  'HiVideoCamera': 'Video',
  'HiPaperAirplane': 'Send',
  'HiMenu': 'Menu',
  'HiSearch': 'Search',
};

// Animation conversions from framer-motion to react-spring
const animationConversions = {
  'motion.div': 'animated.div',
  'motion.span': 'animated.span',
  'motion.button': 'animated.button',
  'motion.section': 'animated.section',
  'motion.article': 'animated.article',
  'motion.header': 'animated.header',
  'motion.footer': 'animated.footer',
  'motion.nav': 'animated.nav',
  'motion.aside': 'animated.aside',
  'motion.main': 'animated.main',
  'motion.h1': 'animated.h1',
  'motion.h2': 'animated.h2',
  'motion.h3': 'animated.h3',
  'motion.p': 'animated.p',
  'motion.img': 'animated.img',
  'motion.svg': 'animated.svg',
  'motion.path': 'animated.path',
  'motion.g': 'animated.g',
  'motion.circle': 'animated.circle',
  'motion.rect': 'animated.rect',
  'motion.ul': 'animated.ul',
  'motion.li': 'animated.li',
  'motion.a': 'animated.a',
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace heroicons imports
  if (content.includes('@heroicons/react')) {
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from\s*['"]@heroicons\/react\/[^'"]+['"]/g,
      (match, icons) => {
        const iconList = icons.split(',').map(icon => {
          const trimmed = icon.trim();
          return iconMappings[trimmed] || trimmed;
        }).join(', ');
        modified = true;
        return `import { ${iconList} } from 'lucide-react'`;
      }
    );
  }

  // Replace react-icons imports
  if (content.includes('react-icons')) {
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from\s*['"]react-icons\/[^'"]+['"]/g,
      (match, icons) => {
        const iconList = icons.split(',').map(icon => {
          const trimmed = icon.trim();
          return iconMappings[trimmed] || trimmed;
        }).join(', ');
        modified = true;
        return `import { ${iconList} } from 'lucide-react'`;
      }
    );
  }

  // Replace framer-motion imports
  if (content.includes('framer-motion')) {
    // Replace motion imports
    content = content.replace(
      /import\s*{\s*motion[^}]*}\s*from\s*['"]framer-motion['"]/g,
      "import { animated, useSpring, useTransition, useChain, config } from '@react-spring/web'"
    );
    
    // Replace motion components
    Object.entries(animationConversions).forEach(([oldComp, newComp]) => {
      if (content.includes(oldComp)) {
        content = content.replace(new RegExp(`<${oldComp}`, 'g'), `<${newComp}`);
        content = content.replace(new RegExp(`</${oldComp.replace('.', '\\.')}>`, 'g'), `</${newComp}>`);
        modified = true;
      }
    });

    // Convert animate props to spring
    content = content.replace(
      /animate={{([^}]+)}}/g,
      (match, props) => {
        modified = true;
        return `style={useSpring({${props}})}`;
      }
    );

    // Convert whileHover to onMouseEnter/onMouseLeave
    content = content.replace(
      /whileHover={{([^}]+)}}/g,
      (match, props) => {
        modified = true;
        return `// TODO: Convert whileHover={{${props}}} to react-spring`;
      }
    );

    // Convert variants
    content = content.replace(
      /variants={[^}]+}/g,
      (match) => {
        modified = true;
        return `// TODO: Convert ${match} to react-spring`;
      }
    );
  }

  // Replace axios imports and usage
  if (content.includes('axios')) {
    // Replace import
    content = content.replace(
      /import\s+axios\s+from\s+['"]axios['"]/g,
      '// axios removed - using native fetch'
    );

    // Replace axios.get
    content = content.replace(
      /axios\.get\(([^)]+)\)/g,
      (match, url) => {
        modified = true;
        return `fetch(${url}).then(res => res.json())`;
      }
    );

    // Replace axios.post
    content = content.replace(
      /axios\.post\(([^,]+),\s*([^)]+)\)/g,
      (match, url, data) => {
        modified = true;
        return `fetch(${url}, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(${data}) }).then(res => res.json())`;
      }
    );

    // Replace axios.put
    content = content.replace(
      /axios\.put\(([^,]+),\s*([^)]+)\)/g,
      (match, url, data) => {
        modified = true;
        return `fetch(${url}, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(${data}) }).then(res => res.json())`;
      }
    );

    // Replace axios.delete
    content = content.replace(
      /axios\.delete\(([^)]+)\)/g,
      (match, url) => {
        modified = true;
        return `fetch(${url}, { method: 'DELETE' }).then(res => res.json())`;
      }
    );
  }

  // Replace moment imports
  if (content.includes('moment')) {
    content = content.replace(
      /import\s+moment\s+from\s+['"]moment['"]/g,
      "import { format, parseISO } from 'date-fns'"
    );
    
    // Basic moment() usage
    content = content.replace(
      /moment\(\)/g,
      'new Date()'
    );
    
    // moment().format()
    content = content.replace(
      /moment\([^)]*\)\.format\(['"]([^'"]+)['"]\)/g,
      (match, formatStr) => {
        modified = true;
        // Convert moment format to date-fns format
        const dateFnsFormat = formatStr
          .replace('YYYY', 'yyyy')
          .replace('MM', 'MM')
          .replace('DD', 'dd')
          .replace('HH', 'HH')
          .replace('mm', 'mm')
          .replace('ss', 'ss');
        return `format(new Date(), '${dateFnsFormat}')`;
      }
    );
  }

  // Remove three.js imports
  if (content.includes('three') || content.includes('@react-three')) {
    content = content.replace(
      /import\s+[^;]+from\s+['"]three['"]/g,
      '// Three.js removed - 3D not needed'
    );
    content = content.replace(
      /import\s+[^;]+from\s+['"]@react-three\/[^'"]+['"]/g,
      '// React Three Fiber removed - 3D not needed'
    );
    modified = true;
  }

  // Remove lottie-react imports
  if (content.includes('lottie-react')) {
    content = content.replace(
      /import\s+[^;]+from\s+['"]lottie-react['"]/g,
      '// Lottie removed - use CSS animations instead'
    );
    modified = true;
  }

  // Remove canvas-confetti imports
  if (content.includes('canvas-confetti')) {
    content = content.replace(
      /import\s+[^;]+from\s+['"]canvas-confetti['"]/g,
      '// Canvas confetti removed'
    );
    modified = true;
  }

  // Remove puppeteer imports
  if (content.includes('puppeteer')) {
    content = content.replace(
      /import\s+[^;]+from\s+['"]puppeteer['"]/g,
      '// Puppeteer removed - use @react-pdf/renderer instead'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  
  return false;
}

function main() {
  console.log('🚀 Starting package migration...\n');
  
  const srcPath = path.join(process.cwd(), 'src');
  const files = glob.sync('**/*.{ts,tsx,js,jsx}', { cwd: srcPath, absolute: true });
  
  console.log(`Found ${files.length} files to check...\n`);
  
  let updatedCount = 0;
  files.forEach(file => {
    if (updateFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✅ Migration complete! Updated ${updatedCount} files.`);
  
  if (updatedCount > 0) {
    console.log('\n⚠️  Please review the changes and fix any TODO comments added for complex conversions.');
    console.log('Some animations and 3D components may need manual adjustment.');
  }
}

main();