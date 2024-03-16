export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen h-full overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
}
