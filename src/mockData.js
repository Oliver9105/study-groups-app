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
      { type: "Link", name: "React Tutorial", link: "https://www.w3schools.com/react/" },
      { type: "Link", name: "React Hooks", link: "https://www.w3schools.com/react/react_hooks.asp" },
      { type: "Link", name: "React useEffect", link: "https://www.w3schools.com/react/react_useeffect.asp" }
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
      { type: "Link", name: "Python Tutorial", link: "https://www.w3schools.com/python/" },
      { type: "Link", name: "NumPy Tutorial", link: "https://www.w3schools.com/python/numpy/" },
      { type: "Link", name: "Pandas Tutorial", link: "https://www.w3schools.com/python/pandas/" }
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
      { type: "Link", name: "Math Tutorial", link: "https://www.w3schools.com/math/" },
      { type: "Link", name: "Statistics", link: "https://www.w3schools.com/statistics/" },
      { type: "Link", name: "Data Science Math", link: "https://www.w3schools.com/datascience/ds_math.asp" }
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
      { type: "Link", name: "JavaScript Tutorial", link: "https://www.w3schools.com/js/" },
      { type: "Link", name: "JS Async/Await", link: "https://www.w3schools.com/js/js_async.asp" },
      { type: "Link", name: "JS Promises", link: "https://www.w3schools.com/js/js_promise.asp" }
    ],
    time: "5:00 PM",
    date: "Today",
    location: "Computer Lab B",
    joined: true
  }
];