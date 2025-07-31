import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreateBus() {
  const [buses, setBuses] = useState([]);
  const [route, setRoute] = useState('');
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [departureTime, setDepartureTime] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchBuses = async () => {
    const res = await axios.get('/api/bus/list');
    setBuses(res.data.buses);
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/bus/create', {
        route,
        price,
        departureTime,
        seats
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Bus created');
      window.location.reload();
      setRoute('');
      setPrice('');
      setDepartureTime('');
      setSeats('');
      fetchBuses();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/bus/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchBuses();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">BusBook Admin</h1>
                <p className="text-sm text-gray-500">Manage Buses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Bus Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add New Bus</h2>
              <p className="text-sm text-gray-500">Create a new bus route for passengers</p>
            </div>
          </div>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Route</label>
                <input 
                  type="text" 
                  placeholder="e.g., Delhi to Mumbai" 
                  value={route} 
                  onChange={e => setRoute(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                <input 
                  type="datetime-local" 
                  value={departureTime} 
                  onChange={e => setDepartureTime(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seats Available</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={seats} 
                  onChange={e => setSeats(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Bus
            </button>
          </form>
        </div>

        {/* Existing Buses */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Existing Buses</h2>
              <p className="text-sm text-gray-500">Manage your current bus routes</p>
            </div>
          </div>

          {buses.length > 0 ? (
            <div className="space-y-4">
              {buses.map(bus => (
                <div key={bus._id} className="bg-gray-50 rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{bus.route}</h3>
                          <p className="text-sm text-gray-500">Departure: {new Date(bus.departureTime).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-lg font-bold text-gray-900">₹{bus.price}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className={`text-sm font-medium ${bus.seatsAvailable > 5 ? 'text-green-600' : bus.seatsAvailable > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {bus.seatsAvailable} seats available
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(bus._id)} 
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg focus:ring-4 focus:ring-red-200 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-2a2 2 0 00-2-2H8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No buses created yet</h3>
              <p className="text-gray-500">Add your first bus route using the form above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}