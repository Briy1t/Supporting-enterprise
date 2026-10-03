import { ShieldCheck, CheckCircle2, Loader2, Save } from "lucide-react";

export default function ClienteForm({ form, onChange, onSubmit, catalogoServicios, cargandoServicios, textoBoton = "Guardar" }) {
  return (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-600">Empresa (Opcional)</label>
        <input 
          name="empresa" 
          value={form.empresa || ""} 
          onChange={onChange} 
          placeholder="Ej: Tech Solutions"
          className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" 
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">Contacto / Nombre</label>
        <input 
          name="nombre" 
          value={form.nombre || ""} 
          onChange={onChange} 
          placeholder="Nombre completo"
          className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" 
          required 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-slate-600">Correo Electrónico</label>
          <input 
            name="email" 
            type="email" 
            value={form.email || ""} 
            onChange={onChange} 
            placeholder="ejemplo@correo.com"
            className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" 
            required 
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-600">Teléfono</label>
          <input 
            name="telefono" 
            value={form.telefono || ""} 
            onChange={onChange} 
            placeholder="Ej: 639481938"
            className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1" 
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-600">Preferencia de Contacto</label>
        <select 
          name="preferencia"
          value={form.preferencia || "correo"}
          onChange={onChange}
          className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 mt-1"
        >
          <option value="correo">Correo</option>
          <option value="telefono">Teléfono</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>

      {catalogoServicios && (
        <div className="pt-2 border-t border-slate-200">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Servicios Vinculados
          </label>
          {cargandoServicios ? (
            <div className="flex items-center gap-2 py-4 text-slate-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> Cargando servicios...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {catalogoServicios.map((s) => {
                const seleccionado = form.servicios?.includes(s.id);
                return (
                  <div 
                    key={s.id} 
                    onClick={() => {
                      const currentServicios = form.servicios || [];
                      const nuevosServicios = seleccionado 
                        ? currentServicios.filter(id => id !== s.id)
                        : [...currentServicios, s.id];
                      onChange({ target: { name: 'servicios', value: nuevosServicios } });
                    }}
                    className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between transition ${seleccionado ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-medium' : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                  >
                    <span className="text-sm">{s.nombre}</span>
                    {seleccionado && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition flex items-center gap-2 cursor-pointer">
          <Save className="w-4 h-4" /> {textoBoton}
        </button>
      </div>
    </form>
  );
}