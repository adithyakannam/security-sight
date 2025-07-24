'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { type Incident } from '../data/mockData';

interface IncidentPlayerProps {
  selectedIncident: Incident | null;
  allIncidents: Incident[];
  onSelectIncident?: (incident: Incident) => void;
}

const IncidentPlayer: React.FC<IncidentPlayerProps> = ({ selectedIncident, allIncidents, onSelectIncident }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration] = useState('02:45');

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Get two other camera thumbnails for the mini strip
  const otherCameras = allIncidents
    .filter(incident => incident.id !== selectedIncident?.id)
    .slice(0, 2);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white mb-2">Incident Player</h2>
        {selectedIncident ? (
          <p className="text-sm text-gray-300">
            Playing: {selectedIncident.type} - {selectedIncident.camera.name}
          </p>
        ) : (
          <p className="text-sm text-gray-400">Select an incident to view</p>
        )}
      </div>

      {/* Large Video Player Area */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
        {selectedIncident ? (
            <div className="absolute inset-0 flex items-center justify-center">
            {/* Main incident thumbnail/video */}
            <div className="w-full h-full relative">
              <Image
                src={selectedIncident.thumbnailUrl}
                alt={`${selectedIncident.type} incident`}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  // Prevent infinite loop by checking if we're already using the fallback
                  if (!img.src.includes('suspicious-activity-1.svg')) {
                    img.src = '/thumbnails/suspicious-activity-1.svg';
                  }
                }}
              />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center  bg-opacity-40">
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
              >
                {isPlaying ? (
                <div className="w-4 h-4 bg-gray-800"></div>
                ) : (
                <div className="w-0 h-0 border-l-6 border-l-gray-800 border-t-3 border-b-3 border-t-transparent border-b-transparent ml-1"></div>
                )}
              </button>
              </div>
            </div>
            
            {/* Incident Alert Overlay */}
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {selectedIncident.type}
            </div>
            
            {/* Camera Label */}
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
              {selectedIncident.camera.name}
            </div>

            {/* Timestamp */}
            <div className="absolute top-12 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
              {new Date(selectedIncident.tsStart).toLocaleTimeString()}
            </div>
            
            {/* Mini Camera Strip - Bottom Right */}
            <div className="absolute bottom-4 right-4 mb-4 max-w-xs ">
              <div className="flex space-x-3">
              {otherCameras.map((incident) => (
              <div
                key={incident.id}
                className="relative w-32 h-20 bg-gray-700 rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                onClick={() => {
                  if (onSelectIncident) {
                    onSelectIncident(incident);
                  }
                }}
              >
                <Image
                src={incident.thumbnailUrl}
                alt={`${incident.camera.name} thumbnail`}
                fill
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  // Prevent infinite loop by checking if we're already using the fallback
                  if (!img.src.includes('suspicious-activity-1.svg')) {
                    img.src = '/thumbnails/suspicious-activity-1.svg';
                  }
                }}
                />
                <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1 py-0.5">
                {incident.camera.name}
                </div>
              </div>
              ))}
              {/* Fill remaining slots with placeholder if needed */}
              {Array.from({ length: Math.max(0, 2 - otherCameras.length) }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="w-32 h-20 bg-gray-600 rounded flex items-center justify-center"
              >
                <span className="text-gray-400 text-xs">No Camera</span>
              </div>
              ))}
              </div>
            </div>
            </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-gray-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📹</span>
              </div>
              <p className="text-gray-400">No incident selected</p>
            </div>
          </div>
        )}
      </div>

      {/* Mini Camera Strip */}
     

      {/* Video Controls */}
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              disabled={!selectedIncident}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                selectedIncident
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isPlaying ? (
                <div className="w-3 h-3 bg-current"></div>
              ) : (
                <div className="w-0 h-0 border-l-3 border-l-current border-t-2 border-b-2 border-t-transparent border-b-transparent ml-0.5"></div>
              )}
            </button>
            
            <div className="text-sm text-gray-300">
              {currentTime} / {duration}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              disabled={!selectedIncident}
              className={`p-2 rounded transition-colors ${
                selectedIncident
                  ? 'hover:bg-gray-600 text-gray-300'
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              🔊
            </button>
            <button 
              disabled={!selectedIncident}
              className={`p-2 rounded transition-colors ${
                selectedIncident
                  ? 'hover:bg-gray-600 text-gray-300'
                  : 'text-gray-500 cursor-not-allowed'
              }`}
            >
              ⛶
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              selectedIncident ? 'bg-blue-600' : 'bg-gray-500'
            }`}
            style={{ width: selectedIncident ? '35%' : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IncidentPlayer;
