import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-blue-800 border border-gray-200 dark:bg-gray-900 dark:border-gray-500 rounded-2xl py-4 px-8 shadow-sm">

      <div>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-100 dark:text-white">
          Selamat Datang!
        </h1>
        <p className="text-[12px] md:text-sm text-gray-100">
          Lacak aplikasi kerja dan kemajuanmu di sini
        </p>
      </div>

      <ThemeToggle />
    </div>
  );
}