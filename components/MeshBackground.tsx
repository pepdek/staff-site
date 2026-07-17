export default function MeshBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mesh-orb animate-mesh-drift absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-indigo-500/25" />
      <div className="mesh-orb animate-mesh-drift-slow absolute top-10 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-500/20" />
      <div className="mesh-orb animate-mesh-drift absolute bottom-[-10rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-400/15" />
    </div>
  );
}
