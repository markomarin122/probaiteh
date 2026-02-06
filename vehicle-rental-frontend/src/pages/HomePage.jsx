import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/Button';

const HomePage = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/vehicles');
                setVehicles(response.data.data.slice(0, 3) || []);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, []);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <div className="relative bg-white pt-20 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6">
                            VAŠA AVANTURA <br />
                            <span className="text-blue-600">POČINJE OVDE.</span>
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
                            Iznajmite vrhunska vozila po najpovoljnijim cenama. Brzo, lako i potpuno digitalno iskustvo rezervacije.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button variant="primary" size="lg" className="px-10 h-16 text-lg" onClick={() => window.location.href = '/vozila'}>
                                Istraži Flotu
                            </Button>
                            <Button variant="secondary" size="lg" className="px-10 h-16 text-lg" onClick={() => window.location.href = '/register'}>
                                Postani Član
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
            </div>

            {/* Features section */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: 'BRZA REZERVACIJA', desc: 'Rezervišite vozilo u manje od 2 minuta preko našeg portala.', icon: '⚡' },
                            { title: 'NAJBOLJE CENE', desc: 'Garantujemo najniže cene na tržištu bez skrivenih troškova.', icon: '💎' },
                            { title: '24/7 PODRŠKA', desc: 'Naš tim je tu za vas u svakom trenutku putovanja.', icon: '📞' }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all border-b-4 border-b-blue-600">
                                <span className="text-4xl mb-6 block">{feat.icon}</span>
                                <h3 className="text-xl font-black text-gray-900 mb-4">{feat.title}</h3>
                                <p className="text-gray-500 font-medium">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Featured Vehicles */}
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Izdvajamo iz ponude</h2>
                            <p className="text-gray-500 font-medium">Pogledajte neka od naših najpopularnijih vozila.</p>
                        </div>
                        <a href="/vozila" className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline">Sva vozila →</a>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {loading ? (
                            <p className="col-span-3 text-center text-gray-400 font-bold">Učitavanje vozila...</p>
                        ) : (
                            vehicles.map(v => (
                                <Card
                                    key={v.id}
                                    title={`${v.brand} ${v.model}`}
                                    subtitle={v.category?.name}
                                    image={v.image_url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800'}
                                    footer={
                                        <Button variant="primary" className="w-full" onClick={() => window.location.href = `/vozila/${v.id}`}>
                                            Rezerviši odmah
                                        </Button>
                                    }
                                >
                                    <p className="text-2xl font-black text-blue-600 mt-2">{v.category?.daily_price} € <span className="text-xs text-gray-400">/dan</span></p>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* CTA section */}
            <div className="bg-blue-600 py-20">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black text-white mb-6">SPREMNI ZA PUT?</h2>
                    <p className="text-blue-100 text-xl font-medium mb-10">Pridružite se hiljadama zadovoljnih korisnika i doživite slobodu kretanja.</p>
                    <Button variant="secondary" size="lg" className="px-12 bg-white text-blue-600 hover:bg-gray-100 border-none" onClick={() => window.location.href = '/register'}>
                        Registruj se sada
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
