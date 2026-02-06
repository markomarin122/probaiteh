import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';

const StaffComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [reply, setReply] = useState('');
    const [status, setStatus] = useState('RESENA');
    const [filter, setFilter] = useState('PODNETA');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:8000/api/complaints', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComplaints(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put(`http://localhost:8000/api/complaints/${selectedComplaint.id}`, {
                resenje: reply,
                status: status
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedComplaint(null);
            setReply('');
            fetchComplaints();
        } catch (err) {
            alert('Greška pri slanju odgovora.');
        }
    };

    const filteredComplaints = filter === 'ALL'
        ? complaints
        : complaints.filter(c => c.status === filter);

    if (loading) return <div className="p-20 text-center font-black text-gray-400 animate-pulse text-2xl tracking-tighter uppercase transition-all">Učitavanje zahteva...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Upravljanje <span className="text-blue-600">Podrškom</span></h1>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]">Pregled i rešavanje zahteva klijenata</p>
                </div>

                <div className="flex bg-gray-100 p-1.5 rounded-[2rem] shadow-inner">
                    {['PODNETA', 'U_OBRADI', 'RESENA', 'ALL'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {f === 'ALL' ? 'Sve' : f.replace('_', ' ').replace('RESENA', 'REŠENA')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredComplaints.map(c => (
                    <div key={c.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group">
                        <div className="p-8 flex-grow">
                            <div className="flex justify-between items-start mb-6">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${c.status === 'PODNETA' ? 'bg-yellow-50 text-yellow-600' :
                                    c.status === 'RESENA' ? 'bg-green-50 text-green-600' :
                                        'bg-blue-50 text-blue-600'
                                    }`}>
                                    {c.status.replace('_', ' ').replace('RESENA', 'REŠENA')}
                                </span>
                                <span className="text-[10px] text-gray-300 font-black tracking-widest">#{c.id}</span>
                            </div>

                            <h3 className="text-xl font-black text-gray-900 mb-2 truncate">{c.naslov}</h3>
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-black text-blue-600">
                                    {c.korisnik?.ime?.charAt(0) || 'K'}
                                </div>
                                <span className="text-xs font-bold text-gray-500">{c.korisnik?.ime}</span>
                            </div>

                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-50 mb-6">
                                <p className="text-gray-600 text-sm leading-relaxed font-medium line-clamp-4">"{c.sadrzaj}"</p>
                            </div>

                            {c.resenje && (
                                <div className="mt-4 pt-6 border-t border-gray-50">
                                    <p className="text-[9px] font-black uppercase text-blue-500 tracking-widest mb-3">Rešenje tima:</p>
                                    <p className="text-xs text-gray-500 font-medium italic line-clamp-2">{c.resenje}</p>
                                </div>
                            )}
                        </div>

                        <div className="p-8 pt-0 mt-auto">
                            <button
                                onClick={() => setSelectedComplaint(c)}
                                className="w-full bg-gray-50 group-hover:bg-blue-600 group-hover:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-200"
                            >
                                {c.resenje ? 'Izmeni Odgovor' : 'Odgovori na zahtev'}
                            </button>
                        </div>
                    </div>
                ))}

                {filteredComplaints.length === 0 && (
                    <div className="col-span-full py-32 text-center bg-gray-50/50 rounded-[4rem] border-4 border-dashed border-gray-100">
                        <p className="text-6xl mb-6 opacity-20">✅</p>
                        <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Nema zahteva u ovoj kategoriji</p>
                    </div>
                )}
            </div>

            {/* Reply Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-12">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Slanje Odgovora</h2>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Klijent: {selectedComplaint.korisnik?.ime}</p>
                                </div>
                                <button onClick={() => setSelectedComplaint(null)} className="text-gray-300 hover:text-gray-900 transition-colors">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10 italic text-gray-600 text-sm">
                                "{selectedComplaint.sadrzaj}"
                            </div>

                            <form onSubmit={handleReply} className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Status Zahteva</label>
                                    <select
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl p-5 text-sm font-bold text-gray-800 outline-none transition-all shadow-inner"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="U_OBRADI">U Obradi</option>
                                        <option value="RESENA">Rešena / Zatvorena</option>
                                        <option value="ODBIJENA">Odbijena</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Vaš Odgovor</label>
                                    <textarea
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl p-5 text-sm font-bold text-gray-800 outline-none transition-all shadow-inner h-48 resize-none"
                                        placeholder="Napišite obrazloženje ili rešenje za klijenta..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <Button type="button" variant="secondary" className="h-16" onClick={() => setSelectedComplaint(null)}>ODUSTANI</Button>
                                    <Button type="submit" variant="primary" className="h-16 shadow-2xl shadow-blue-200">POŠALJI ODGOVOR</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffComplaintsPage;
