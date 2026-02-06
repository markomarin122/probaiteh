import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

const VehicleManagementPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Inicijalna forma
    const initialForm = {
        marka: '', model: '', registracioniBroj: '', godiste: 2024,
        gorivo: 'Benzin', menjac: 'Manuelni', sedista: 5,
        cenaPoDanu: 0, filijalaId: 1, kategorijaId: 1, image_url: ''
    };
    const [formData, setFormData] = useState(initialForm);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/vehicles?status=all');
            setVehicles(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingVehicle) {
                await axios.put(`http://localhost:8000/api/vehicles/${editingVehicle.id}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage({ text: 'Vozilo uspešno ažurirano!', type: 'success' });
            } else {
                await axios.post('http://localhost:8000/api/vehicles', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage({ text: 'Novo vozilo uspešno dodato u flotu!', type: 'success' });
            }
            setIsModalOpen(false);
            setFormData(initialForm);
            fetchVehicles();
        } catch (err) {
            setMessage({ text: 'Greška pri čuvanju podataka. Proverite polja.', type: 'error' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Da li ste sigurni da želite da uklonite ovo vozilo iz flote?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/vehicles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage({ text: 'Vozilo uklonjeno.', type: 'success' });
            fetchVehicles();
        } catch (err) {
            setMessage({ text: 'Greška pri brisanju.', type: 'error' });
        }
    };

    if (loading) return (
        <div className="p-20 text-center font-black text-blue-600 animate-pulse text-2xl tracking-tighter">
            UČITAVANJE FLOTE...
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                <div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Upravljanje Flotom</h1>
                    <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.2em] mt-3 flex items-center">
                        <span className="w-3 h-3 bg-blue-600 rounded-full mr-3 animate-ping"></span>
                        Admin panel za vozila
                    </p>
                </div>
                <button
                    onClick={() => { setEditingVehicle(null); setFormData(initialForm); setIsModalOpen(true); }}
                    className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                >
                    <span className="text-xl">+</span> Dodaj Novo Vozilo
                </button>
            </div>

            {message.text && (
                <div className={`mb-10 p-5 rounded-2xl font-bold flex justify-between items-center animate-fade-in ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                    <span>{message.text}</span>
                    <button onClick={() => setMessage({ text: '', type: '' })} className="text-xs uppercase opacity-50 font-black">Zatvori</button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {vehicles.map(v => (
                    <div key={v.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-blue-200/50 transition-all border border-gray-50 flex flex-col">
                        <div className="h-56 overflow-hidden relative">
                            <img
                                src={v.image_url || 'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800'}
                                alt={v.marka}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    {v.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-black text-gray-900 leading-tight">{v.marka} {v.model}</h3>
                                <p className="font-black text-blue-600 text-xl">{v.cenaPoDanu}€</p>
                            </div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">{v.kategorija?.naziv || 'KATEGORIJA'}</p>

                            <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-gray-500 mb-8">
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 uppercase tracking-tighter text-center">
                                    {v.gorivo}
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 uppercase tracking-tighter text-center">
                                    {v.menjac}
                                </div>
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 uppercase tracking-tighter text-center col-span-2">
                                    Reg: {v.registracioniBroj}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => { setEditingVehicle(v); setFormData(v); setIsModalOpen(true); }}
                                    className="bg-blue-50 text-blue-600 py-3 rounded-xl text-xs font-black uppercase hover:bg-blue-600 hover:text-white transition-all"
                                >
                                    Izmeni
                                </button>
                                <button
                                    onClick={() => handleDelete(v.id)}
                                    className="bg-red-50 text-red-500 py-3 rounded-xl text-xs font-black uppercase hover:bg-red-500 hover:text-white transition-all"
                                >
                                    Ukloni
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[3rem] p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(30,58,138,0.2)] border border-blue-100">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-black text-gray-900 mb-2">{editingVehicle ? 'Izmena Vozila' : 'Novi Automobil'}</h2>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em]">Popunite detalje o vozilu</p>
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Marka" value={formData.marka} onChange={e => setFormData({ ...formData, marka: e.target.value })} placeholder="npr. BMW" />
                            <Input label="Model" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} placeholder="npr. Serija 5" />
                            <Input label="Registracija" value={formData.registracioniBroj} onChange={e => setFormData({ ...formData, registracioniBroj: e.target.value })} placeholder="BG-123-AA" />
                            <Input label="Godište" type="number" value={formData.godiste} onChange={e => setFormData({ ...formData, godiste: e.target.value })} />

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Gorivo</label>
                                <select
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none focus:border-blue-500 transition-all appearance-none"
                                    value={formData.gorivo}
                                    onChange={e => setFormData({ ...formData, gorivo: e.target.value })}
                                >
                                    <option>Benzin</option>
                                    <option>Dizel</option>
                                    <option>Električno</option>
                                    <option>Hibrid</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-2 tracking-widest">Menjač</label>
                                <select
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-bold text-gray-800 outline-none focus:border-blue-500 transition-all appearance-none"
                                    value={formData.menjac}
                                    onChange={e => setFormData({ ...formData, menjac: e.target.value })}
                                >
                                    <option>Manuelni</option>
                                    <option>Automatski</option>
                                </select>
                            </div>

                            <Input label="Cena po danu (€)" type="number" value={formData.cenaPoDanu} onChange={e => setFormData({ ...formData, cenaPoDanu: e.target.value })} />
                            <Input label="Broj sedišta" type="number" value={formData.sedista} onChange={e => setFormData({ ...formData, sedista: e.target.value })} />

                            <div className="col-span-1 md:col-span-2">
                                <Input label="URL slike automobila" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
                            </div>

                            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 mt-10">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all"
                                >
                                    Odustani
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                                >
                                    Sačuvaj Vozilo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleManagementPage;
