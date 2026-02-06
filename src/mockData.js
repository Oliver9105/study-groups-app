export const initialGroups = [
  {
    id: 1,
    subject: "React",
    title: "Hooks Mastery",
    description: "Deep dive into useEffect and custom hooks for final year projects.",
    members: 12,
    memberList: [
      { name: "Jane Smith", role: "Admin", avatar: "JS" },
      { name: "Alex Chen", role: "Member", avatar: "AC" },
      { name: "Sam Wilson", role: "Member", avatar: "SW" },
      { name: "Maria Garcia", role: "Member", avatar: "MG" }
    ],
    resources: [
      { type: "PDF", name: "React Cheat Sheet", link: "#" },
      { type: "Link", name: "Official Docs", link: "https://react.dev" },
      { type: "PDF", name: "Hooks Guide", link: "#" }
    ],
    time: "4:00 PM",
    date: "Today",
    location: "Library Room 302",
    joined: true
  },
  {
    id: 2,
    subject: "Python",
    title: "Data Science Basics",
    description: "Weekly review of Pandas and NumPy libraries with peer coding.",
    members: 8,
    memberList: [
      { name: "David Kim", role: "Admin", avatar: "DK" },
      { name: "Lisa Wang", role: "Member", avatar: "LW" },
      { name: "Tom Brown", role: "Member", avatar: "TB" }
    ],
    resources: [
      { type: "PDF", name: "Pandas Cheat Sheet", link: "#" },
      { type: "Link", name: "NumPy Documentation", link: "https://numpy.org" }
    ],
    time: "10:30 AM",
    date: "Tomorrow",
    location: "Zoom: link-in-bio",
    joined: false
  },
  {
    id: 3,
    subject: "Math",
    title: "Calculus II Prep",
    description: "Solving past exam papers on integration and series.",
    members: 5,
    memberList: [
      { name: "Emma Davis", role: "Admin", avatar: "ED" },
      { name: "Ryan Lee", role: "Member", avatar: "RL" }
    ],
    resources: [
      { type: "PDF", name: "Integration Formulas", link: "#" },
      { type: "PDF", name: "Practice Problems", link: "#" }
    ],
    time: "2:00 PM",
    date: "Feb 6th",
    location: "Student Union Hall",
    joined: false
  },
  {
    id: 4,
    subject: "JavaScript",
    title: "Async/Await Workshop",
    description: "Learning to handle APIs and asynchronous operations effectively.",
    members: 15,
    memberList: [
      { name: "Chris Johnson", role: "Admin", avatar: "CJ" },
      { name: "Anna Martinez", role: "Member", avatar: "AM" },
      { name: "Mike Taylor", role: "Member", avatar: "MT" }
    ],
    resources: [
      { type: "Link", name: "MDN Async Guide", link: "https://developer.mozilla.org" },
      { type: "PDF", name: "API Examples", link: "#" }
    ],
    time: "5:00 PM",
    date: "Today",
    location: "Computer Lab B",
    joined: true
  }
];