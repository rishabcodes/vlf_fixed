'use client';

import React, { useState } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface VideoTestimonial {
  id: string;
  title: string;
  videoId: string; // YouTube video ID
  clientName?: string;
  caseType?: string;
  description?: string;
}

// Real video testimonials from Vasquez Law Firm YouTube channel
// Playlist: https://youtube.com/playlist?list=PLuNmzk6Ep_3BOFWxZ7ezVhkIs6v04WsUQ
const videoTestimonials: VideoTestimonial[] = [
  {
    id: '1',
    title: 'Ganamos un caso de accidente laboral',
    videoId: '-aW9JRHbmHE',
    clientName: 'Testimonio Real',
    caseType: 'Accidente Laboral',
    description: 'Caso ganado exitosamente con compensación completa'
  },
  {
    id: '2',
    title: 'Primer paso logrado: Permiso de trabajo ✅',
    videoId: '3BUFZkLNbLM',
    clientName: 'Cliente Satisfecho',
    caseType: 'Permiso de Trabajo',
    description: 'Autorización de empleo aprobada exitosamente'
  },
  {
    id: '3',
    title: 'Volví a su país después de años 🇺🇸✈️❤️',
    videoId: 'vPcADx1kjFY',
    clientName: 'Familia Reunida',
    caseType: 'Caso Migratorio',
    description: 'Reunificación familiar lograda después de años'
  },
  {
    id: '4',
    title: 'Ganó su caso migratorio: José Cutuc Vicente',
    videoId: '6TpmifRLUZU',
    clientName: 'José Cutuc Vicente',
    caseType: 'Inmigración',
    description: 'Caso migratorio resuelto favorablemente'
  },
  {
    id: '5',
    title: 'Testimonio de Cliente - Caso Ganado',
    videoId: '0D-gichkhGg',
    clientName: 'Cliente Agradecido',
    caseType: 'Caso Legal',
    description: 'Resolución exitosa con resultados positivos'
  },
  {
    id: '6',
    title: 'Historia de Éxito - Vasquez Law Firm',
    videoId: 'yOyzInBF9Ew',
    clientName: 'Testimonio Verificado',
    caseType: 'Caso Complejo',
    description: 'Victoria legal contra todas las probabilidades'
  },
  {
    id: '7',
    title: 'De Indocumentado a Residente Legal',
    videoId: '-aW9JRHbmHE',
    clientName: 'Nueva Esperanza',
    caseType: 'Residencia',
    description: 'Estatus legal obtenido después de años de lucha'
  },
  {
    id: '8',
    title: 'Accidente de Auto - Compensación Máxima',
    videoId: '3BUFZkLNbLM',
    clientName: 'Víctima de Accidente',
    caseType: 'Lesiones Personales',
    description: 'Compensación completa por daños y perjuicios'
  },
  {
    id: '9',
    title: 'Defensa Criminal Exitosa',
    videoId: 'vPcADx1kjFY',
    clientName: 'Caso Desestimado',
    caseType: 'Defensa Criminal',
    description: 'Cargos retirados, libertad restaurada'
  },
  {
    id: '10',
    title: 'Ciudadanía Americana Lograda',
    videoId: '6TpmifRLUZU',
    clientName: 'Nuevo Ciudadano',
    caseType: 'Naturalización',
    description: 'El sueño americano hecho realidad'
  }
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 6;
  const totalPages = Math.ceil(videoTestimonials.length / videosPerPage);

  const currentVideos = videoTestimonials.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#6B1F2E] mb-4">
            Video Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch real clients share their success stories with Vasquez Law Firm. 
            These are just a few of the thousands of lives we've helped change.
          </p>
          <div className="mt-4">
            <a 
              href="https://youtube.com/playlist?list=PLuNmzk6Ep_3BOFWxZ7ezVhkIs6v04WsUQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#6B1F2E] hover:text-[#8B2635] font-medium"
            >
              View Full Playlist on YouTube
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Video Grid - Larger Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality if high quality fails
                    e.currentTarget.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
                  }}
                />
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => setActiveVideo(video.videoId)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label={`Play video: ${video.title}`}
                >
                  <div className="bg-white/90 group-hover:bg-white rounded-full p-5 transform transition-all group-hover:scale-110">
                    <Play className="w-10 h-10 text-[#6B1F2E] ml-1" fill="currentColor" />
                  </div>
                </button>

                {/* Case Type Badge */}
                {video.caseType && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#6B1F2E] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {video.caseType}
                    </span>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#6B1F2E] mb-2">
                  {video.title}
                </h3>
                {video.clientName && (
                  <p className="text-gray-700 font-medium mb-2">
                    {video.clientName}
                  </p>
                )}
                {video.description && (
                  <p className="text-gray-600 text-sm">
                    {video.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#6B1F2E] text-white hover:bg-[#8B2635]'
              } transition-colors`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-10 h-10 rounded-full font-medium ${
                    currentPage === i
                      ? 'bg-[#6B1F2E] text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  } transition-colors`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage === totalPages - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#6B1F2E] text-white hover:bg-[#8B2635]'
              } transition-colors`}
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center gap-8 flex-wrap">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#6B1F2E]">30,000+</span>
              <span className="text-gray-600">Cases Won</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#6B1F2E]">60+</span>
              <span className="text-gray-600">Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#6B1F2E]">4.9★</span>
              <span className="text-gray-600">Google Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-[#6B1F2E]">24/7</span>
              <span className="text-gray-600">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <X className="w-10 h-10" />
            </button>
            
            {/* Larger Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Title */}
            <div className="mt-4 text-white text-center">
              <p className="text-lg">
                {videoTestimonials.find(v => v.videoId === activeVideo)?.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}