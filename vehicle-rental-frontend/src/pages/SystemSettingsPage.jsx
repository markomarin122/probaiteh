import React, { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const SystemSettingsPage = () => {
    // Mocked settings state (would normally fetch from API)
    const [settings, setSettings] = useState({
        taxRate: 20,
        currency: 'EUR',
        supportEmail: 'podrska@itehrent.com',
        maintenanceMode: false,
        passwordPolicy: 'strong', // strong, medium, weak
        maxLoginAttempts: 3
    });

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        // Here we would send PUT /api/settings
        alert('Podešavanja su uspešno sačuvana (Simulacija)');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Podešavanja Sistema</h1>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-10">Globalna konfiguracija aplikacije</p>

            <div className="space-y-8">
                {/* Finance Section */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="text-3xl">💰</span> Finansije
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Stopa Poreza (%)"
                            type="number"
                            value={settings.taxRate}
                            onChange={e => handleChange('taxRate', e.target.value)}
                        />
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Valuta</label>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                                value={settings.currency}
                                onChange={e => handleChange('currency', e.target.value)}
                            >
                                <option value="EUR">EUR (€)</option>
                                <option value="RSD">RSD (din)</option>
                                <option value="USD">USD ($)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                        <span className="text-3xl">🛡️</span> Bezbednost
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Polisa Lozinki</label>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                                value={settings.passwordPolicy}
                                onChange={e => handleChange('passwordPolicy', e.target.value)}
                            >
                                <option value="strong">Jaka (Min 8 karaktera, simboli)</option>
                                <option value="medium">Srednja (Min 6 karaktera)</option>
                                <option value="weak">Slaba (Bez ograničenja)</option>
                            </select>
                        </div>
                        <Input
                            label="Max broj pokušaja prijave"
                            type="number"
                            value={settings.maxLoginAttempts}
                            onChange={e => handleChange('maxLoginAttempts', e.target.value)}
                        />
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-50">
                        <h3 className="text-xs font-black uppercase tracking-widest text-red-500 mb-4">Opasna Zona</h3>
                        <div className="flex items-center justify-between bg-red-50 p-6 rounded-2xl">
                            <div>
                                <h4 className="font-bold text-gray-900">Maintenance Mode</h4>
                                <p className="text-xs text-gray-500">Privremeno isključi pristup za sve klijente.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={settings.maintenanceMode} onChange={e => handleChange('maintenanceMode', e.target.checked)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button onClick={handleSave} className="shadow-xl shadow-green-100 bg-green-600 hover:bg-green-700 w-full md:w-auto">
                        Sačuvaj Promene
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SystemSettingsPage;
