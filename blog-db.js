// Blog Management System - LocalStorage Database & Seed Data

(function() {
  // Pre-seeded Authors
  const defaultAuthors = [
    {
      id: "auth-1",
      name: "Sheikh Abdul Rahman",
      image: "image_1.png",
      bio: "Sheikh Abdul Rahman is a graduate of Al-Azhar University, specializing in Quranic recitations and Tajweed rules. He has over 10 years of experience teaching Arabic linguistics and Islamic theology to international students.",
      email: "arahman@onlinequrancollege.com",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      id: "auth-2",
      name: "Ustadha Maryam Khan",
      image: "image_3.png",
      bio: "Ustadha Maryam Khan holds an Ijazah in Hafs 'an 'Asim and specializes in interactive Noorani Qaida lessons for young children. She is passionate about creating engaging educational content for beginners.",
      email: "mkhan@onlinequrancollege.com",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    }
  ];

  // Pre-seeded Blogs
  const defaultBlogs = [
    {
      id: "post-1",
      title: "The Importance of Reciting the Quran with Proper Tajweed",
      subtitle: "Discover why correct pronunciation and articulation are crucial for every student of the Quran.",
      slug: "importance-of-proper-tajweed",
      category: "Tajweed Education",
      tags: ["Tajweed", "Quran", "Pronunciation", "Spiritual"],
      authorId: "auth-1",
      image: "translation_hero.webp",
      content: `<h2>Understanding Tajweed: An Obligation and a Blessing</h2>
<p>The word <strong>Tajweed</strong> literally means 'to make beautiful' or 'to improve'. In the context of Quranic recitation, it refers to the set of rules governing how each letter of the Quran should be pronounced, including its elongation, pauses, and articulation points.</p>

<blockquote>"Or add to it, and recite the Quran with measured recitation."<br>— Surah Al-Muzzammil (73:4)</blockquote>

<h3>Why articulative accuracy is essential</h3>
<p>Reciting with Tajweed is not just an aesthetic addition to reading the Quran. It prevents grammatical mistakes that can change the entire meaning of the words of Allah. Here are the core reasons to master Tajweed:</p>
<ul>
  <li><strong>Preserving the Divine Message:</strong> Minor changes in pronunciation can convert a word of praise into a word of warning.</li>
  <li><strong>Following the Prophet's recitative tradition:</strong> The Quran was revealed to the Prophet Muhammad (PBUH) with natural rules of melody and pronunciation.</li>
  <li><strong>Improving spiritual connection:</strong> Proper articulation slows down the reciter, allowing for deeper contemplation (Tadabbur).</li>
</ul>

<h3>Key Rules to Start With</h3>
<table>
  <thead>
    <tr>
      <th>Rule Name</th>
      <th>Meaning</th>
      <th>Application Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Makharij al-Huroof</td>
      <td>Articulation Points</td>
      <td>Pronouncing letters from throat, tongue, or lips</td>
    </tr>
    <tr>
      <td>Ghunnah</td>
      <td>Nasal Recitation</td>
      <td>Nasal sound applied to Noon and Meem Mushaddadah</td>
    </tr>
    <tr>
      <td>Qalqalah</td>
      <td>Echoing / Bouncing</td>
      <td>Vocal bounce applied to letters (Qaf, Ta, Baa, Jeem, Dal)</td>
    </tr>
  </tbody>
</table>

<p>For absolute beginners, beginning with a structured guide like Noorani Qaida under the guidance of a certified tutor is highly recommended.</p>`,
      seoTitle: "Why Tajweed Rules Matter | Online Quran College Blog",
      seoDesc: "Learn why reciting the Quran with Tajweed is crucial, the core rules of articulation, and how to start your learning journey.",
      status: "Published", // Published, Draft, Scheduled
      publishDate: "2026-06-12",
      views: 124,
      isFeatured: true
    },
    {
      id: "post-2",
      title: "5 Effective Memory Techniques for Kids Memorizing the Quran",
      subtitle: "Help your child become a Hafiz with these practical, science-backed learning methods.",
      slug: "memory-techniques-kids-memorizing-quran",
      category: "Hifz Academy",
      tags: ["Hifz", "Memory", "Children", "Education"],
      authorId: "auth-2",
      image: "hifz_hero.webp",
      content: `<h2>Making Hifz Easy for Young Minds</h2>
<p>Memorizing the Quran (Hifz) is a monumental and spiritually rewarding journey. For children, it requires special techniques that keep them engaged, focused, and motivated without causing burnout.</p>

<h3>1. Visual Formatting & Memory Mapping</h3>
<p>Encourage your child to use the same physical Mushaf copy at all times. The brain creates visual maps of the text, remembering the position of verses on the page (top, bottom, left, or right).</p>

<h3>2. The 'Listen First' Method</h3>
<p>Before memorizing a new portion, children should listen to a certified Qari recite it multiple times. This prevents memorizing letters with wrong pronunciation, which is very hard to correct later.</p>

<h3>3. Gradual Chunking</h3>
<p>Do not attempt to memorize large blocks at once. Break the verse into smaller chunks:</p>
<ol>
  <li>Memorize the first phrase.</li>
  <li>Memorize the second phrase.</li>
  <li>Connect both together and repeat.</li>
</ol>

<h3>4. Revision (Daur) Routines</h3>
<p>New memorization is temporary. Weekly and daily review schedules are crucial. Establishing a routine where the child recites their portion to parents or online tutors keeps retention solid.</p>

<h3>5. Positive Reinforcement</h3>
<p>Celebrate small milestones. Memorizing half a Juz, completing a Surah, or maintaining a perfect weekly attendance deserves celebration and reward.</p>`,
      seoTitle: "Hifz Memory Tips for Kids | Quran Learning Strategies",
      seoDesc: "Discover five proven memory techniques to support kids on their Quran memorization journey, including visual mapping and listening habits.",
      status: "Published",
      publishDate: "2026-06-15",
      views: 98,
      isFeatured: false
    }
  ];

  // Seed Admin Database Roles
  const defaultUsers = [
    { email: "tech.iqratech@gmail.com", password: "#oqc123", role: "Admin", name: "System Administrator" },
    { email: "editor@onlinequrancollege.com", password: "editor123", role: "Editor", name: "Senior Editor" },
    { email: "author@onlinequrancollege.com", password: "author123", role: "Author", name: "Guest Writer" }
  ];

  // Initialize LocalStorage Collections
  if (!localStorage.getItem("oqc_authors")) {
    localStorage.setItem("oqc_authors", JSON.stringify(defaultAuthors));
  }
  if (!localStorage.getItem("oqc_blogs")) {
    localStorage.setItem("oqc_blogs", JSON.stringify(defaultBlogs));
  }
  if (!localStorage.getItem("oqc_users")) {
    localStorage.setItem("oqc_users", JSON.stringify(defaultUsers));
  }

  // Global APIs
  window.OQC_DB = {
    // Blogs
    getBlogs: function() {
      const list = JSON.parse(localStorage.getItem("oqc_blogs") || "[]");
      // Filter out scheduled ones if not viewed inside CMS, based on current date
      return list;
    },
    saveBlogs: function(blogs) {
      localStorage.setItem("oqc_blogs", JSON.stringify(blogs));
      // Sync with old custom_blogs for compatibility if any code uses it
      localStorage.setItem("custom_blogs", JSON.stringify(blogs.filter(b => b.status === "Published")));
    },
    
    // Authors
    getAuthors: function() {
      return JSON.parse(localStorage.getItem("oqc_authors") || "[]");
    },
    saveAuthors: function(authors) {
      localStorage.setItem("oqc_authors", JSON.stringify(authors));
    },

    // Users & Session
    getUsers: function() {
      return JSON.parse(localStorage.getItem("oqc_users") || "[]");
    },
    getCurrentUser: function() {
      const email = localStorage.getItem("admin_logged_in_email");
      const loggedIn = localStorage.getItem("admin_logged_in");
      if (loggedIn === "true" && email) {
        const users = this.getUsers();
        return users.find(u => u.email === email) || { email: email, role: "Admin", name: "Administrator" };
      }
      return null;
    },

    // Utilities
    calculateReadingTime: function(text) {
      const wordsPerMinute = 200;
      const cleanText = text.replace(/<[^>]*>/g, ""); // strip html
      const words = cleanText.trim().split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      return minutes || 1;
    }
  };
})();
