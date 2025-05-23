'use client'
import { useState } from 'react'
import ExecutiveNavbar from '../components/NavbarExecutive/page'
import Navbar from '../components/Navbar/Page'

export default function ExecutiveDashboard() {
  const [activeTab, setActiveTab] = useState(null) // Start with no tab selected
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Conference 2023',
      date: '2023-11-20',
      attendees: 150,
      status: 'Upcoming',
      description: 'Annual technology conference with workshops and keynote speakers'
    },
    {
      id: 2,
      title: 'Web Dev Workshop',
      date: '2023-10-15',
      attendees: 45,
      status: 'Completed',
      description: 'Hands-on workshop for modern web development'
    }
  ])
  
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    attendees: ''
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [currentEventId, setCurrentEventId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Submit new event
  const handleSubmit = (e) => {
    e.preventDefault()
    const newEvent = {
      id: events.length + 1,
      title: formData.title,
      date: formData.date,
      attendees: parseInt(formData.attendees) || 0,
      status: 'Upcoming',
      description: formData.description
    }
    setEvents([...events, newEvent])
    resetForm()
  }

  // Edit existing event
  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description,
      attendees: event.attendees.toString()
    })
    setIsEditing(true)
    setCurrentEventId(event.id)
  }

  // Update event
  const handleUpdate = (e) => {
    e.preventDefault()
    setEvents(events.map(event => 
      event.id === currentEventId ? {
        ...event,
        title: formData.title,
        date: formData.date,
        description: formData.description,
        attendees: parseInt(formData.attendees) || 0
      } : event
    ))
    resetForm()
  }

  // Delete event
  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id))
  }

  // Toggle event status
  const toggleStatus = (id) => {
    setEvents(events.map(event => 
      event.id === id ? {
        ...event,
        status: event.status === 'Upcoming' ? 'Completed' : 'Upcoming'
      } : event
    ))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      description: '',
      attendees: ''
    })
    setIsEditing(false)
    setCurrentEventId(null)
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Title', 'Date', 'Status', 'Attendees', 'Description']
    const csvContent = [
      headers.join(','),
      ...events.map(event => [
        `"${event.title.replace(/"/g, '""')}"`,
        event.date,
        event.status,
        event.attendees,
        `"${event.description.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'events_export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
{/*       <ExecutiveNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
 */}      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Screen (shown when no tab is selected) */}
        {!activeTab && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to Executive Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Manage your events and data efficiently with our executive tools.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab('events')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Event Management
              </button>
              <button
                onClick={() => setActiveTab('data')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
              >
                Data Management
              </button>
            </div>
          </div>
        )}

        {/* Event Management Component (shown when events tab is selected) */}
        {activeTab === 'events' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Event Form */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-28">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  {isEditing ? 'Edit Event' : 'Create New Event'}
                </h2>
                
                <form onSubmit={isEditing ? handleUpdate : handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Expected Attendees
                      </label>
                      <input
                        type="number"
                        name="attendees"
                        value={formData.attendees}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                      {isEditing ? 'Update Event' : 'Create Event'}
                    </button>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            {/* Right Side - Event List */}
            <div className="lg:w-2/3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Management</h1>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <button
                    onClick={exportToCSV}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Events</h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-300">{events.length}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Upcoming</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-300">
                    {events.filter(e => e.status === 'Upcoming').length}
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                  <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Attendees</h3>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                    {events.reduce((sum, event) => sum + event.attendees, 0)}
                  </p>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Upcoming Events
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {events.filter(e => e.status === 'Upcoming').length} events
                  </span>
                </div>
                
                {filteredEvents.filter(e => e.status === 'Upcoming').length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEvents.filter(e => e.status === 'Upcoming').map(event => (
                      <EventItem 
                        key={event.id}
                        event={event}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={toggleStatus}
                      />
                    ))}
                  </ul>
                ) : (
                  <EmptyState message="No upcoming events found" />
                )}
              </div>
              
              {/* Past Events */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Past Events
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {events.filter(e => e.status === 'Completed').length} events
                  </span>
                </div>
                
                {filteredEvents.filter(e => e.status === 'Completed').length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEvents.filter(e => e.status === 'Completed').map(event => (
                      <EventItem 
                        key={event.id}
                        event={event}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={toggleStatus}
                      />
                    ))}
                  </ul>
                ) : (
                  <EmptyState message="No past events found" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Data Management Component (shown when data tab is selected) */}
        {activeTab === 'data' && (
          <DataManagementView />
        )}
      </div>
    </div>
  )
}

// Event Item Component
function EventItem({ event, onEdit, onDelete, onToggleStatus }) {
  return (
    <li className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-medium ${
              event.status === 'Upcoming' 
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-800 dark:text-gray-200'
            }`}>
              {event.title}
            </h3>
            <button
              onClick={() => onToggleStatus(event.id)}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                event.status === 'Upcoming' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
            >
              {event.status}
            </button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {new Date(event.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {event.description}
          </p>
          
          <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Attendees: {event.attendees}
          </div>
        </div>
        
        <div className="flex space-x-2 sm:space-x-1">
          <button
            onClick={() => onEdit(event)}
            className="p-2 text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30"
            aria-label="Edit event"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30"
            aria-label="Delete event"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  )
}

// Empty State Component
function EmptyState({ message }) {
  return (
    <div className="px-6 py-12 text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">{message}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {message.includes('upcoming') 
          ? 'Create your first event using the form on the left.'
          : 'Completed events will appear here.'}
      </p>
    </div>
  )
}

// Data Management View (Placeholder)
function DataManagementView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Management</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <p className="text-gray-600 dark:text-gray-300">
          Data management dashboard content will be displayed here. This could include:
        </p>
        <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
          <li>User analytics</li>
          <li>Event participation statistics</li>
          <li>Database management tools</li>
          <li>Export/import functionality</li>
        </ul>
      </div>
    </div>
  )
}
