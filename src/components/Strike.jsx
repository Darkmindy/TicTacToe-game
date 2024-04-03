function Strike({ strikeClass }) {
  // Verifica se è stata fornita una classe per lo stile dello strike
  const className = strikeClass ? `strike ${strikeClass}` : "strike";
  
  return <div className={className}></div>;
}

export default Strike;
