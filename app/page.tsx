// // app/page.tsx
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-12">
//       {/* Hero Section */}
//       <section className="text-center max-w-4xl">
//         <h1 className="text-5xl md:text-6xl font-extrabold text-purple-500 mb-6">
//           Welcome to <span className="text-white">Gamez24</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-300 mb-10">
//           Your ultimate destination to grab{" "}
//           <span className="text-purple-400 font-semibold">free</span> games and{" "}
//           <span className="text-purple-400 font-semibold">cheap deals</span>{" "}
//           from top platforms like <span className="text-white">Steam</span>,{" "}
//           <span className="text-white">Epic Games</span>, and{" "}
//           <span className="text-white">GOG.com</span>. We track deals so you
//           never miss a freebie.
//         </p>
//         <Link
//           href="/deals"
//           className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-6 py-3 rounded-2xl transition shadow-lg shadow-purple-900"
//         >
//           Explore Free Deals
//         </Link>
//       </section>

//       {/* Platforms Showcase */}
//       <section className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-12 items-center text-center">
//         <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 group">
//           <div className="p-5 rounded-full  group-hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.7)] transition-shadow duration-500">
//             <Image
//               src="/steam_logo.png"
//               alt="Steam"
//               width={100}
//               height={100}
//               className="mb-4"
//             />
//           </div>
//           <p className="text-gray-400 mt-2">Free Games on Steam</p>
//         </div>

//         <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 group">
//           <div className="p-5 rounded-full group-hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.7)] transition-shadow duration-500">
//             <Image
//               src="/epic_games.png"
//               alt="Epic Games"
//               width={100}
//               height={100}
//               className="mb-3"
//             />
//           </div>
//           <p className="text-gray-400">Weekly Free Epic Games</p>
//         </div>

//         <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 group">
//           <div className="p-5 rounded-full  group-hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.7)] transition-shadow duration-500">
//             <Image
//               src="/gog3.png"
//               alt="Prime Gaming"
//               width={100}
//               height={100}
//               className="mb-4"
//             />
//           </div>
//           <p className="text-gray-400 mt-2">Free Games on GOG.com </p>
//         </div>
//       </section>
//     </main>
//   );
// }
// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center px-6 py-12 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* You can use a collage of game images or a single hero image */}
        <Image
          src="/gaming-page.png" // Replace with your gaming background image
          alt="Gaming Background"
          fill
          className="object-cover opacity-15" // Adjust opacity as needed
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
      </div>

      {/* Content - positioned above background */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        {/* Hero Section */}
        <section className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-500 mb-6 drop-shadow-2xl">
            Welcome to <span className="text-foreground">Gamez24</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-10 drop-shadow-lg leading-relaxed">
            Your ultimate destination to grab{" "}
            <span className="text-purple-400 font-semibold">free</span> games and{" "}
            <span className="text-purple-400 font-semibold">cheap deals</span> from
            top platforms like <span className="text-white font-medium">Steam</span>,{" "}
            <span className="text-foreground font-medium">Epic Games</span>, and{" "}
            <span className="text-white font-medium">GOG.com</span>. We track deals so
            you never miss a freebie.
          </p>
          <Link 
            href="/deals" 
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-900/50 hover:shadow-purple-600/50 hover:scale-105"
          >
            Explore Free Deals
          </Link>
        </section>

        {/* Platforms Showcase */}
        <section className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-12 items-center text-center">
          <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 group">
            <div className="p-5 rounded-full  group-hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.7)] transition-all duration-500">
              <Image
                src="/steam_logo.png"
                alt="Steam"
                width={100}
                height={100}
                className="mb-4"
              />
            </div>
            <p className="text-gray-300 mt-2 font-medium">Free Games on Steam</p>
          </div>

          <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 group">
            <div className="p-5 rounded-full group-hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.7)] transition-all duration-500">
              <Image
                src="/epic_games.png"
                alt="Epic Games"
                width={100}
                height={100}
                className="mb-3"
              />
            </div>
            <p className="text-gray-300 font-medium">Weekly Free Epic Games</p>
          </div>

          <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105 group">
            <div className="p-5 rounded-full  group-hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.7)] transition-all duration-500">
              <Image
                src="/gog3.png"
                alt="GOG Games"
                width={100}
                height={100}
                className="mb-4"
              />
            </div>
            <p className="text-gray-300 mt-2 font-medium">Free Games on GOG.com</p>
          </div>
        </section>
      </div>
    </main>
  );
}