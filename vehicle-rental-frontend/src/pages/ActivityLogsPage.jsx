import React from 'react';

const ActivityLogsPage = () => {
    // Mocked logs data
    const logs = [
        { id: 1, action: 'LOGIN_SUCCESS', user: 'admin@test.com', time: '10:42 AM', date: 'Danas', type: 'info' },
        { id: 2, action: 'USER_CREATED', user: 'admin@test.com', time: '10:30 AM', date: 'Danas', details: 'Kreiran korisnik Petar Petrović', type: 'success' },
        { id: 3, action: 'VEHICLE_UPDATED', user: 'sluzbenik@test.com', time: '09:15 AM', date: 'Danas', details: 'Izmenjena cena za Audi Q8', type: 'warning' },
        { id: 4, action: 'LOGIN_FAILED', user: 'unknown@ip.addr', time: '02:00 AM', date: 'Danas', details: 'IP: 192.168.1.1', type: 'error' },
        { id: 5, action: 'RESERVATION_CANCELLED', user: 'marko.klijent', time: 'Juče', date: '08/02/2026', type: 'warning' },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Sistemski Logovi</h1>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-10">Revizija sistemskih događaja</p>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 bg-gray-50/30">
                    <div className="flex gap-4">
                        <select className="bg-white border border-gray-200 text-xs font-bold uppercase tracking-widest rounded-xl px-4 py-2 outline-none">
                            <option>Svi Događaji</option>
                            <option>Greške</option>
                            <option>Upozorenja</option>
                        </select>
                        <input type="date" className="bg-white border border-gray-200 text-xs font-bold rounded-xl px-4 py-2 outline-none" />
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {logs.map(log => (
                        <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors flex items-start gap-4">
                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${log.type === 'error' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                                    log.type === 'warning' ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]' :
                                        log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                                }`}></div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-gray-900 text-sm tracking-wide">{log.action.replace('_', ' ')}</h3>
                                    <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest">{log.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium">
                                    <span className="text-gray-400">Korisnik:</span> {log.user}
                                </p>
                                {log.details && (
                                    <p className="text-xs text-gray-500 mt-1 bg-gray-50 inline-block px-2 py-1 rounded border border-gray-100">
                                        {log.details}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-6 text-center border-t border-gray-50">
                    <button className="text-[10px] font-black uppercase text-blue-600 tracking-widest hover:underline">Učitaj starije zapise</button>
                </div>
            </div>
        </div>
    );
};

export default ActivityLogsPage;
