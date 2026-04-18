import React from "react";

export default function GameCard({
  title,
  description,
  image,
  status,
  platform,
  releaseLabel = "Global Release",
}) {
  return (
    <div className="group relative bg-[#2a2a2a] rounded-2xl overflow-hidden transition-all hover:bg-[#353535] hover:-translate-y-1">
      
      {/* Imagen */}
      <div className="aspect-video w-full relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] via-transparent to-transparent"></div>

        {/* Badge */}
        {status && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-[#c9bfff]/20 backdrop-blur-md text-[#c9bfff] text-[10px] font-bold uppercase tracking-tighter rounded-full">
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-2xl font-bold text-[#e2e2e2] leading-tight uppercase group-hover:text-[#c9bfff] transition-colors">
              {title}
            </h4>
            <p className="text-[#c9c4d8] text-sm mt-1">
              {description}
            </p>
          </div>

          <span className="material-symbols-outlined text-[#a4c9ff]">
            devices
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-[#484555]/20 pt-4">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-[#c9c4d8]">
              public
            </span>
            <span className="text-[10px] font-bold text-[#c9c4d8] uppercase tracking-widest">
              {releaseLabel}
            </span>
          </div>

          {platform && (
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-[#c9c4d8]">
                token
              </span>
              <span className="text-[10px] font-bold text-[#c9c4d8] uppercase tracking-widest">
                {platform}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}