import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';

const VehiclesPage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/vehicles');
                setVehicles(response.data.data || []);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) return <div className="p-20 text-center font-black text-blue-600 animate-pulse">Učitavanje flote...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-12">
                <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Naša Kompletna Flota</h1>
                <p className="text-xl text-gray-500 max-w-2xl font-medium">Istražite širok spektar vozila spremnih za vaše sledeće putovanje. Od gradskih automobila do luksuznih limuzina.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <Card
                            key={vehicle.id}
                            title={`${vehicle.marka} ${vehicle.model}`}
                            subtitle={vehicle.kategorija?.naziv}
                            image={vehicle.image_url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'}
                            footer={
                                <div className="flex justify-between items-center w-full">
                                    <span className="font-black text-2xl text-blue-600">
                                        {vehicle.cenaPoDanu} € <span className="text-xs text-gray-400 font-bold uppercase">/ dan</span>
                                    </span>
                                    <Button variant="primary" onClick={() => (window.location.href = `/vozila/${vehicle.id}`)}>
                                        Detalji
                                    </Button>
                                </div>
                            }
                        >
                            <div className="grid grid-cols-3 gap-2 mt-4 py-4 border-t border-gray-100">
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Gorivo</p>
                                    <p className="text-xs font-bold text-gray-800">{vehicle.gorivo}</p>
                                </div>
                                <div className="text-center border-x border-gray-100">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Pogon</p>
                                    <p className="text-xs font-bold text-gray-800">{vehicle.menjac}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase text-gray-400">Putnici</p>
                                    <p className="text-xs font-bold text-gray-800">{vehicle.sedista}</p>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full border-4 border-dashed border-gray-100 rounded-3xl p-20 text-center">
                        <p className="text-2xl font-black text-gray-300">Trenutno nema dostupnih vozila.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VehiclesPage;
