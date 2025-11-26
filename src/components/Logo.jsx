
export default function Logo() {
  return (
    <div className="flex items-center gap-1.5 h-8">
      
      {/* Main Logo Icon */}
      <img src="../src/assets/svgs/kynda-logo.svg" className="w-8 h-8" alt="Logo" />

      {/* Letters */}
      <div className="flex items-end gap-0.5">
        <img src="../src/assets/svgs/K.svg" className="h-4" alt="K" />
        <img src="../src/assets/svgs/Y.svg" className="h-4" alt="Y" />
        <img src="../src/assets/svgs/N.svg" className="h-4" alt="N" />
        <img src="../src/assets/svgs/D.svg" className="h-4" alt="D" />
        <img src="../src/assets/svgs/A.svg" className="h-4" alt="A" />
      </div>

    </div>
  );
}
