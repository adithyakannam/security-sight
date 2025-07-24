'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { type Incident } from '../data/mockData';

interface IncidentListProps {
    incidents: Incident[];
    selectedIncident: Incident | null;
    onSelectIncident: (incident: Incident) => void;
    onResolveIncident: (incidentId: string) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({
    incidents,
    selectedIncident,
    onSelectIncident,
    onResolveIncident
}) => {
    const [optimisticResolving, setOptimisticResolving] = useState<string[]>([]);

    const getIncidentTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'unauthorized access':
                return 'bg-red-900 text-red-200 border-red-800';
            case 'gun threat':
                return 'bg-red-900 text-red-200 border-red-800';
            case 'suspicious activity':
                return 'bg-yellow-900 text-yellow-200 border-yellow-800';
            case 'motion detection':
                return 'bg-blue-900 text-blue-200 border-blue-800';
            case 'face recognised':
                return 'bg-green-900 text-green-200 border-green-800';
            case 'vehicle intrusion':
                return 'bg-orange-900 text-orange-200 border-orange-800';
            case 'equipment tampering':
                return 'bg-purple-900 text-purple-200 border-purple-800';
            case 'loitering':
                return 'bg-indigo-900 text-indigo-200 border-indigo-800';
            default:
                return 'bg-gray-700 text-gray-200 border-gray-600';
        }
    };

    const getStatusColor = (resolved: boolean) => {
        return resolved ? 'bg-green-500' : 'bg-red-500';
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDuration = (start: string, end: string | null) => {
        if (!end) return 'Ongoing';

        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const durationMs = endTime - startTime;
        const minutes = Math.floor(durationMs / (1000 * 60));
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleResolve = async (incidentId: string, event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent incident selection when clicking resolve

        // Optimistic UI update
        setOptimisticResolving(prev => [...prev, incidentId]);

        try {
            await onResolveIncident(incidentId);
            // Remove from optimistic list on success
            setOptimisticResolving(prev => prev.filter(id => id !== incidentId));
        } catch (error) {
            // Remove from optimistic list if error occurs
            setOptimisticResolving(prev => prev.filter(id => id !== incidentId));
        }
    };

    const isOptimisticallyResolving = (incidentId: string) => {
        return optimisticResolving.includes(incidentId);
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-2">Incident List</h2>
                        <p className="text-sm text-gray-300">{incidents.length} incidents detected</p>
                    </div>
                    <div className="flex gap-8 text-center">
                        <div>
                            <div className="text-lg font-bold text-red-400">
                                {incidents.filter(i => !i.resolved).length}
                            </div>
                            <div className="text-xs text-gray-400">Active</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-green-400">
                                {incidents.filter(i => i.resolved).length}
                            </div>
                            <div className="text-xs text-gray-400">Resolved</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-h-[40rem] overflow-y-auto">
                {incidents.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-2">🛡️</div>
                        <p>No incidents detected</p>
                        <p className="text-sm">All systems secure</p>
                    </div>
                ) : (
                    incidents.map((incident) => {
                        const isResolving = isOptimisticallyResolving(incident.id);
                        const displayResolved = incident.resolved || isResolving;

                        return (
                            <div
                                key={incident.id}
                                onClick={() => onSelectIncident(incident)}
                                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedIncident?.id === incident.id
                                    ? 'border-blue-500 bg-blue-900'
                                    : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                                    } ${isResolving ? 'opacity-60' : ''}`}
                            >
                                {/* Thumbnail and main info */}
                                <div className="flex items-start space-x-3 mb-3">
                                    <div className="relative w-16 h-12 bg-gray-600 rounded overflow-hidden flex-shrink-0">
                                        <Image
                                            src={incident.thumbnailUrl}
                                            alt={`${incident.type} thumbnail`}
                                            fill
                                            className="object-cover"
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                // Prevent infinite loop by checking if we're already using a data URL fallback
                                                if (!img.src.includes('data:image')) {
                                                    // Create a simple placeholder image using data URL
                                                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+';
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-3 h-3 rounded-full ${getStatusColor(displayResolved)}`}></div>
                                                <span className="font-medium text-white truncate">{incident.type}</span>
                                            </div>
                                            {!displayResolved && (
                                                <span className={`px-2 py-1 text-xs font-medium rounded border ${getIncidentTypeColor(incident.type)} flex-shrink-0`}>
                                                    {incident.type.split(' ')[0]}
                                                </span>
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-300 space-y-1">
                                            <div className="flex justify-between">
                                                <span><strong>Camera:</strong> {incident.camera.name}</span>
                                                <span><strong>Time:</strong> {formatTime(incident.tsStart)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span><strong>Location:</strong> {incident.camera.location}</span>
                                                <span><strong>Duration:</strong> {formatDuration(incident.tsStart, incident.tsEnd)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-600">
                                    <div className="flex space-x-2">
                                        <button className="text-xs bg-blue-800 text-blue-200 px-2 py-1 rounded hover:bg-blue-700 transition-colors">
                                            View Details
                                        </button>
                                        {!displayResolved && (
                                            <button
                                                onClick={(e) => handleResolve(incident.id, e)}
                                                disabled={isResolving}
                                                className={`text-xs px-2 py-1 rounded transition-colors ${isResolving
                                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                    : 'bg-green-800 text-green-200 hover:bg-green-700'
                                                    }`}
                                            >
                                                {isResolving ? 'Resolving...' : 'Mark Resolved'}
                                            </button>
                                        )}
                                    </div>
                                    <span className={`text-xs ${displayResolved ? 'text-green-400' : 'text-red-400'} font-medium`}>
                                        {displayResolved ? 'Resolved' : 'Active'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default IncidentList;
