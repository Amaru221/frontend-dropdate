// src/pages/Calendar.jsx
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import { formatReleaseFullDate } from '../helpers/format.dates';
//import es from 'date-fns/locale/es'; // Importar el idioma español
import enUS from 'date-fns/locale/en-US'; // Importar el idioma ingles
import "react-datepicker/dist/react-datepicker.css";
import { ArrowRight, ClosedCaptionIcon, Search, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import { AlignVerticalJustifyStart } from 'lucide-react';
import { getGamesRelasesRange } from '../api/games.api';
import GameCard from '../components/calendar/GameCard';
import defaultImage from "../assets/steam_logo_art_2000.0.webp";
import { groupGamesByDate } from '../helpers/clasifyGameByDates';
import { formatReleaseDate, weekdayFormatted } from '../helpers/format.dates';


//registerLocale('es', es);
registerLocale('en-US', enUS);
export function Calendar() {
    const [games, setGames] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleTodayClick = () => {
        setStartDate(new Date());
        setEndDate(new Date());
    };

    const handleWeekClick = () => {
        const startOfWeek = new Date();
        const endOfWeek = new Date(startOfWeek);
        startOfWeek.setDate(endOfWeek.getDate() - startOfWeek.getDay());
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    };

    const handleMonthClick = () => {
        const startOfMonth = new Date();
        const endOfMonth = new Date(startOfMonth);
        startOfMonth.setDate(1);
        endOfMonth.setMonth(startOfMonth.getMonth() + 1, 0);
        setStartDate(startOfMonth);
        setEndDate(endOfMonth);
    };

    const handleClearRange = () => {
        setStartDate(new Date());
        setEndDate(new Date());
    };

    useEffect(() => {
        getGamesRelasesRange(startDate, endDate)
            .then((data) => {
            setGames(data);
            })
            .catch(console.error);
    }, [startDate, endDate]);

    const grouped = groupGamesByDate(games);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
          <Navbar />
          <Sidebar />
    
            <main className="min-h-200 xl:pl-64 pt-20">
                {/** Nube fondo */}
                <div className="absolute left-100 -top-12 w-64 h-64 bg-[#8675e95d] rounded-full blur-[100px] pointer-events-none"></div>
                {/** Title main section */}
                <div className='grid grid-cols-1 ml-5 mb-10 mt-5'>
                    <h1 className="text-6xl font-headline font-extrabold tracking-tighter text-white mb-2 italic">Release Calendar</h1>
                    <p className="text-[#706e6e] max-w-xl">Curated global timeline of drops, launches, and debuts across the digital landscape.</p>
                </div>
                
                <div className="flex">
                {/* Div que ocupa el 30% para el calendario */}
                    <div className="flex w-2/10 p-5 rounded-xl border border-white/5 shadow-2xl items-center justify-center">
                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            //selectsStart
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            locale="en-US"
                            inline
                            calendarClassName="custom-datepicker" // Añadir una clase personalizada para los estilos
                        />
                    </div>

                    {/* Div que ocupa el 70% para el contenido */}
                    <div className="w-8/10 p-5">
                        <div className="grid grid-cols-1 gap-10">
                            <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pl-15 pr-15">
                                <div className='grid grid-cols-1 justify-between items-center gap-5 m-1'>
                                    {/* Span selected range */}
                                    <div>
                                        <span className='text-[10px] uppercase font-bold tracking-widest text-[#c9bfff] mb-2'>Selected Range</span>
                                    </div>
                                    <div className='flex justify-between items-center gap-5'>
                                        {/* Fecha inicio */}
                                        <div className='bg-[#353535] px-4 py-2 rounded-lg border border-white/5'>
                                            <span className="text-xs font-headline text-white">{formatReleaseFullDate(startDate)}</span>
                                        </div>
                                        {/* Flecha separadora */}
                                        <div>
                                            <ArrowRight size={16} className="opacity-90" />
                                        </div>
                                        {/* Fecha fin */}
                                        <div className='bg-[#353535] px-4 py-2 rounded-lg border border-white/5'>
                                            <span className="text-xs font-headline text-white">{formatReleaseFullDate(endDate)}</span>
                                        </div>
                                        {/* Borrar Fecha */}
                                        <button className='ml-2 text-[#aba0dd] hover:text-white transition-colors opacity-90 cursor-pointer'>
                                            <X size={16} className="text-sm font-extrabold" onClick={handleClearRange}/>
                                        </button>
                                    </div>
                                    
                                </div>

                                {/* DIV atajo select range */}
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-4 py-2 bg-[#aba0dd] text-[#2e009c] text-[10px] font-bold rounded uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer" onClick={handleTodayClick}>Today</button>
                                    <button className="px-4 py-2 bg-[#353535] text-[#cfcfcf] text-[10px] font-bold rounded uppercase tracking-widest hover:bg-[#393939] transition-all cursor-pointer" onClick={handleWeekClick}>This Weekend</button>
                                    <button className="px-4 py-2 bg-[#353535] text-[#cfcfcf] text-[10px] font-bold rounded uppercase tracking-widest hover:bg-[#393939] transition-all cursor-pointer"onClick={handleMonthClick}>This Month</button>
                                </div>
                                
                            </div>

                            {/* Filtros y Busqueda */}
                            <div className="flex flex-col bg-[#1b1b1b] p-4 rounded-xl border border-white/5 flex-wrap gap-3">
                                <div className='flex flex-wrap gap-3 items-center '>
                                    <div className="h-8 flex items-center bg-[#353535] px-3 py-2 rounded-lg gap-2 text-sm cursor-pointer">
                                        <AlignVerticalJustifyStart size={15} strokeWidth={1.2} />
                                        <span className="font-label uppercase font-bold text-[10px] tracking-wider">Verticals</span>
                                    </div>
                                    <button className="max-h-7 px-3 py-1.5 bg-[#a4c9ff]/10 border border-[#a4c9ff]/20 text-tertiary text-[10px] font-bold rounded uppercase tracking-widest cursor-pointer">All Platforms</button>
                                    <button className="max-h-7 px-3 py-1.5 bg-[#353535] text-[#aba0dd] text-[10px] font-bold rounded uppercase tracking-widest hover:bg-surface-bright cursor-pointer">PlayStation</button>
                                    <button className="max-h-7 px-3 py-1.5 bg-[#353535] text-[#aba0dd] text-[10px] font-bold rounded uppercase tracking-widest hover:bg-surface-bright cursor-pointer">iOS / Android</button>
                                </div>
                                
                                <div className="flex-grow"></div>
                                <div className="relative">
                                    <Search size={15} className=" absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#484555]"/>
                                    <input className="bg-[#0e0e0e] border border-white/5 focus:ring-1 focus:ring-[#c9bfff] text-[10px] font-headline py-2 pl-9 pr-4 rounded w-48 transition-all focus:w-64 placeholder:text-[#484555] uppercase" placeholder="SEARCH RELEASES" type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contenido Filtrado */}
                <div className='mt-10 mb-10'>
                    {/* Etiqueta Resultados encontrados */}
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-[#a4c9ff]/20 text-[#a4c9ff] text-[10px] font-black uppercase tracking-widest rounded">{games.length} results found for selected range</span>
                    </div>
                    
                </div>
                {/* Contenido por días */}
                <div className="flex flex-col gap-10 mt-10 mb-10">
                    {Object.entries(grouped).map(([date, games]) => (
                        
                        <div key={date}>
                            {/* 🗓️ Cabecera del día */}
                            <div className="sticky top-28 z-10 flex items-baseline gap-4 mb-8">
                                <h3 className="text-5xl font-headline font-black text-[#a4c9ff] italic">{formatReleaseDate(date)}</h3>
                                <span className="text-sm font-label text-[#c9c4d8] font-bold uppercase tracking-widest">{weekdayFormatted(date)}</span>
                                <div className="flex-grow h-px bg-gradient-to-r from-[#a4c9ff]/30 to-transparent"></div>
                            </div>

                            {/* 🎮 Juegos de ese día */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {games.map((g) => (
                                    <GameCard
                                        key={g.id}
                                        title={g.title}
                                        description={g.description}
                                        image={defaultImage}
                                        status={g.status}
                                        platform="Solana Mainnet"
                                    />
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            </main >
            <Footer />
            <ScrollToTopButton />
        </div>
        
    
  );
};

export default Calendar;