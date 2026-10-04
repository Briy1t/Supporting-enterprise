import useMiPerfil from "../hooks/useMiPerfil";

export default function TecnicoPerfil() {
  const tecnicoId = 1;
  const { perfil, loading, error } = useMiPerfil(tecnicoId);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Mi Perfil</h1>
      <pre>{JSON.stringify(perfil, null, 2)}</pre>
    </div>
  );
}
