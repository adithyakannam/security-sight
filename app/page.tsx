'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';

interface Camera {
  id: string;
  name: string;
  location: string;
}

interface Incident {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string | null;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
}

export default function HomePage() {  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch incidents from API
  const fetchIncidents = useCallback(async (resolved?: boolean) => {
    try {
      setLoading(true);
      const query = resolved !== undefined ? `?resolved=${resolved}` : '';
      const response = await fetch(`/api/incidents${query}`);
      if (!response.ok) throw new Error('Failed to fetch incidents');
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load - using a ref to ensure it only runs once
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    
    hasInitialized.current = true;
    fetchIncidents();
  }, []);

  // Handle incident selection
  const handleSelectIncident = useCallback((incident: Incident) => {
    setSelectedIncident(incident);
  }, []);

  // Handle incident resolution with optimistic updates
  const handleResolveIncident = useCallback(async (incidentId: string) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      });
      
      if (!response.ok) throw new Error('Failed to resolve incident');
      
      const updatedIncident = await response.json();
      
      // Update the incidents list with the resolved incident
      setIncidents(prev => 
        prev.map(incident => 
          incident.id === incidentId ? updatedIncident : incident
        )
      );
      
      // Update selected incident if it's the one being resolved
      if (selectedIncident?.id === incidentId) {
        setSelectedIncident(updatedIncident);
      }
    } catch (error) {
      console.error('❌ Error resolving incident:', error);
      throw error; // Re-throw to handle in component
    }
  }, [selectedIncident]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-white">Loading incidents...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className=" mx-auto px-6 py-1 border border-gray-700 bg-gray-800 rounded-lg p-5">
        {/* Filter Controls */}
        <div className="mb-1 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incident Player - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <IncidentPlayer 
              selectedIncident={selectedIncident} 
              allIncidents={incidents}
              onSelectIncident={handleSelectIncident}
            />
          </div>
          
          {/* Incident List - Takes up 1 column on large screens */}
          <div className="lg:col-span-1">
            <IncidentList 
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={handleSelectIncident}
              onResolveIncident={handleResolveIncident}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
