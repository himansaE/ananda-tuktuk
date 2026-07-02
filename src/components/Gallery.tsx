"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhaSRwJhlRMJOXpvMJ2509VNO8oOSxXcJiNBOPSoYM3gBD8100UtudTSCyJgm6zm5TMye4BTBuoki0rvONMk_pybTUZeYul1WR8e9j_yfo3p0C8bROmuol8syEReq7MOtRjAZMXEi2r-rY5FRbyCT-ZT-DcZSqBDzZrFCmFb5FWma18jLcl5OJgCxjqjcQU_ibX1AdKW3aLw2N0EpwxMmWIro-D9N3wxdCNmqd2abaux3UE9mHX6-Y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCLEOzrtGrjxRi2kzrXW3Rn7sYr4A1Glx7uncU-a1wN5M_GgjagFvXd9HZvQzCmuIf3560vWvZVgKmYZ3jcJ_CBKpj2XlRDE1Rrpkke-N8V5NDeC5CWlNLYGQh8VFuMu41P6Mc0QBI4I8BselR9L4hBYhchCHzW9rX4pNtM0a7tfJDwAZ4Hjet7DnNjjS__3LbQamlwhRl7l4Ye3NhiFFnwMgO7KBdb3q0qxKiFtoT8xdYyR7wl5wOF",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAz5yLDXTVth3YgIhu9NUmB1BCVeaSJaYfF3D9yOFJxz6YyWQzBEh6aiez5hfr5ELMI0Jl9NjvYyIcHQu_zYBZqryzOfcsVVLVhFt7891bSVSx-tDUDq_eqKxHQnP5WDvln4zcFw9kd3xy3176HJT6VN_luLK81idxEYBvgK1rxQDfFfZT09L4WtF2PMG7rnB1io9NckqbQrs9X3nWOxwGsJ6BqG1NMvvMcY9gAu4i9M-5imDVZyq1e",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAb1BaO4q6T6Oe56Vw7N6KW3ZRdTq-EVWnGna45PFRbRsj9Tz_4qMt5CeOuyZ7mS8-HuJ4P7KURrbxtKj0Rkd20XQwt8GI2oOUs6-S8PHcVzP2e-YyYC0i6ZVOT-lpThep7OhdpLiJ4rRfLl4516XMAQ7hhWSrBW2NdYmG_J16SJ56SgmddMmoFPqyVprbs7M6bG87VBtbcwz2BYFkdpZA9HZohNh46z_TiubmmK-fI7PKTvI8iKU8q",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBrl4hYHdCYveUwfRSRLIKAolBEqx2cDpc-uLLbfzL4gPlUVVc3NyFwkRFWlG8CPMgOo-DzaqRWMN61SPDzbwiL_1su1pHS6KSE59hYCVlZ5KSXeXhCNiYJqZi9OdLEFbIwErgQAxbtEUX2JgPU_IL-g1pUNfrBqLjbmVrwBsi4qPecUw45DmU9BEaR1muVVbh19ofTtSSDyDa6cQwIZvz1Xb40UtZ_KKlfZerdIJcVs6wcJ9TM3oQ_Nq3z-lEAHFrbiw"
];

export function Gallery() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(track.current, {
      xPercent: -50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });
  }, { scope: container });

  return (
    <section ref={container} className="py-32 bg-background overflow-hidden relative">
      <div className="flex gap-4 w-max px-4" ref={track}>
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative w-[300px] md:w-[450px] h-[400px] md:h-[600px] flex-shrink-0 filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700">
            <Image src={src} alt={`Gallery image ${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
