export const featuredAthletes = [
  { name: "Marcus Johnson", info: `PG \u2022 6'2" \u2022 Class of 2026`, location: "Los Angeles, CA", ppg: "22.5", rpg: "4.2", apg: "8.1", img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", verified: true, desc: "An elite floor general with exceptional court vision and ability to score at all three levels. Proven leader on and off the court with a high basketball IQ." },
  { name: "David Chen", info: `SG \u2022 6'5" \u2022 Class of 2025`, location: "Seattle, WA", ppg: "24.1", rpg: "5.5", apg: "3.2", img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", verified: true, desc: "Knockdown shooter with deep range. Excellent off-ball movement and plays tough perimeter defense. Shooting 42% from distance this season." },
  { name: "Jamal Reynolds", info: `SF \u2022 6'8" \u2022 Class of 2026`, location: "Chicago, IL", ppg: "18.5", rpg: "9.2", apg: "4.1", img: "https://images.unsplash.com/photo-1518481612222-68bbe828def1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", verified: true, desc: "Versatile wing defender who can guard positions 1-4. Explosive in transition with a rapidly developing face-up game. High-motor player." }
];

export const athletesNearYou = [
  ...featuredAthletes,
  { name: "Jaylen Williams", info: `SG \u2022 6'4" \u2022 Class of 2025`, location: "Atlanta, GA", ppg: "25.8", rpg: "5.5", apg: "3.2", img: "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: true },
  { name: "Tyler Robinson", info: `SF \u2022 6'7" \u2022 Class of 2026`, location: "Houston, TX", ppg: "18.3", rpg: "7.8", apg: "2.5", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: false },
  { name: "DeAndre Carter", info: `PF \u2022 6'9" \u2022 Class of 2025`, location: "Chicago, IL", ppg: "20.1", rpg: "11.2", apg: "1.8", img: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: true },
  { name: "Elijah Moore", info: `SG \u2022 6'3" \u2022 Class of 2026`, location: "Dallas, TX", ppg: "19.5", rpg: "3.2", apg: "5.1", img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: true },
  { name: "Cameron Davis", info: `SF \u2022 6'6" \u2022 Class of 2025`, location: "Miami, FL", ppg: "16.8", rpg: "8.5", apg: "2.2", img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: false },
  { name: "Jordan Smith", info: `PG \u2022 6'0" \u2022 Class of 2026`, location: "New York, NY", ppg: "14.3", rpg: "2.8", apg: "9.5", img: "https://images.unsplash.com/photo-1534067341853-2781b0a42ea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: true },
  { name: "Isaiah Thomas", info: `PF \u2022 6'8" \u2022 Class of 2027`, location: "Phoenix, AZ", ppg: "12.1", rpg: "10.2", apg: "1.0", img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", verified: false }
];

export const scoreChartData = [
  { x: 0, y: 40, date: "Dec 24", score: "12.0" },
  { x: 40, y: 39, date: "Dec 30", score: "12.1" },
  { x: 80, y: 41, date: "Jan 2", score: "11.9" },
  { x: 120, y: 39, date: "Jan 5", score: "12.1" },
  { x: 160, y: 40, date: "Jan 8", score: "12.0" },
  { x: 200, y: 45, date: "Jan 11", score: "11.5" },
  { x: 240, y: 39, date: "Jan 14", score: "12.1" },
  { x: 280, y: 36, date: "Jan 17", score: "12.4" },
  { x: 320, y: 42, date: "Jan 20", score: "11.8" },
  { x: 360, y: 43, date: "Jan 23", score: "11.7" },
  { x: 400, y: 42, date: "Jan 26", score: "11.8" },
  { x: 440, y: 36, date: "Jan 29", score: "12.4" },
  { x: 480, y: 41, date: "Feb 1", score: "11.9" },
  { x: 520, y: 40, date: "Feb 4", score: "12.0" },
  { x: 560, y: 46, date: "Feb 7", score: "11.4" },
  { x: 600, y: 34, date: "Feb 10", score: "12.6" },
  { x: 640, y: 45, date: "Feb 16", score: "11.5" },
  { x: 680, y: 41, date: "Feb 22", score: "11.9" },
  { x: 720, y: 42, date: "Feb 28", score: "11.8" },
  { x: 760, y: 39, date: "Mar 3", score: "12.1" },
  { x: 800, y: 35, date: "Mar 6", score: "12.5" },
  { x: 840, y: 38, date: "Mar 9", score: "12.2" },
  { x: 880, y: 45, date: "Mar 15", score: "11.5" },
  { x: 920, y: 44, date: "Mar 18", score: "11.6" },
  { x: 960, y: 38, date: "Mar 21", score: "12.2" },
  { x: 1e3, y: 41, date: "Mar 24", score: "11.9" }
];
