'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';
import { mockIncidents, type Incident } from './data/mockData';

export default function HomePage() {  
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  // Load mock data on component mount
  useEffect(() => {
    // Simulate loading delay for realistic experience
    setTimeout(() => {
      setIncidents(mockIncidents);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle incident resolution with local state updates
  const handleResolveIncident = useCallback(async (incidentId: string) => {
    try {
      // Update the incidents list with the resolved incident
      setIncidents(prev => 
        prev.map(incident => 
          incident.id === incidentId 
            ? { ...incident, resolved: !incident.resolved }
            : incident
        )
      );
      
      // Update selected incident if it's the one being resolved
      if (selectedIncident?.id === incidentId) {
        setSelectedIncident(prev => 
          prev ? { ...prev, resolved: !prev.resolved } : null
        );
      }
    } catch (error) {
      console.error('❌ Error resolving incident:', error);
      throw error; // Re-throw to handle in component
    }
  }, [selectedIncident]);

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading Security Dashboard...</p>
              <p className="text-gray-400 text-sm mt-2">Scanning camera feeds...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Security Dashboard</h1>
              <p className="text-gray-400">
                Real-time monitoring across {incidents.filter(i => !i.resolved).length} active incidents
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">System Online</span>
              </div>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Incident Player */}
          <div className="space-y-6">
            <IncidentPlayer 
              selectedIncident={selectedIncident}
              allIncidents={incidents}
              onSelectIncident={handleSelectIncident}
            />
          </div>

          {/* Right Column - Incident List */}
          <div className="space-y-6">
            <IncidentList
              incidents={incidents}
              selectedIncident={selectedIncident}
              onSelectIncident={handleSelectIncident}
              onResolveIncident={handleResolveIncident}
            />
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-400">{incidents.length}</div>
            <div className="text-sm text-gray-400">Total Incidents</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-red-400">
              {incidents.filter(i => !i.resolved).length}
            </div>
            <div className="text-sm text-gray-400">Active Alerts</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-400">
              {incidents.filter(i => i.resolved).length}
            </div>
            <div className="text-sm text-gray-400">Resolved</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-yellow-400">4</div>
            <div className="text-sm text-gray-400">Active Cameras</div>
          </div>
        </div>
      </main>
    </div>
  );
}
