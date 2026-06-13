export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-10 h-10 border-4 border-pink-light border-t-gold rounded-full animate-spin"></div>
    </div>
  );
}
