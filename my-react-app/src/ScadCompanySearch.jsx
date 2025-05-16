import { useState } from 'react'
import styles from './scadCompanySearch.module.css'


function ScadCompanySearch() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter,setFilter] = useState('');

    const internshipApplicants = [
        // Graphic Design
        { name: "Pentagram", applyDate: "2025-05-01", major: "Graphic Design" },
        { name: "Landor & Fitch", applyDate: "2025-05-11", major: "Graphic Design" },
        { name: "Wolff Olins", applyDate: "2025-05-12", major: "Graphic Design" },
      
        // Industrial Design
        { name: "IDEO", applyDate: "2025-05-02", major: "Industrial Design" },
        { name: "Whipsaw", applyDate: "2025-05-13", major: "Industrial Design" },
        { name: "Smart Design", applyDate: "2025-05-14", major: "Industrial Design" },
      
        // UX Design
        { name: "Frog Design", applyDate: "2025-05-03", major: "UX Design" },
        { name: "Huge Inc.", applyDate: "2025-05-15", major: "UX Design" },
        { name: "Work & Co", applyDate: "2025-05-16", major: "UX Design" },
      
        // Interactive Design
        { name: "Adobe Systems", applyDate: "2025-05-04", major: "Interactive Design" },
        { name: "InVision", applyDate: "2025-05-17", major: "Interactive Design" },
        { name: "Figma", applyDate: "2025-05-18", major: "Interactive Design" },
      
        // Animation
        { name: "Pixar Animation Studios", applyDate: "2025-05-05", major: "Animation" },
        { name: "DreamWorks Animation", applyDate: "2025-05-06", major: "Animation" },
        { name: "Blue Sky Studios", applyDate: "2025-05-19", major: "Animation" },
      
        // Fashion Design
        { name: "Gucci", applyDate: "2025-05-07", major: "Fashion Design" },
        { name: "Prada", applyDate: "2025-05-20", major: "Fashion Design" },
        { name: "Alexander McQueen", applyDate: "2025-05-21", major: "Fashion Design" },
      
        // Art History
        { name: "MoMA", applyDate: "2025-05-08", major: "Art History" },
        { name: "The Getty", applyDate: "2025-05-22", major: "Art History" },
        { name: "Tate Modern", applyDate: "2025-05-23", major: "Art History" },
      
        // Transportation Design
        { name: "Tesla Design Studio", applyDate: "2025-05-09", major: "Transportation Design" },
        { name: "BMW Designworks", applyDate: "2025-05-24", major: "Transportation Design" },
        { name: "Ford Global Design", applyDate: "2025-05-25", major: "Transportation Design" },
      
        // Game Design
        { name: "Epic Games", applyDate: "2025-05-10", major: "Game Design" },
        { name: "Ubisoft", applyDate: "2025-05-26", major: "Game Design" },
        { name: "Riot Games", applyDate: "2025-05-27", major: "Game Design" }
      ];
      

      let filteredCompanies = internshipApplicants.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMajor = filter === '' || company.major === filter;
        return matchesSearch && matchesMajor;
      });
      

      function handleChange(e){
        setFilter(e.target.value)
      }
      
  return(
    <div className={styles.mainContainer}>
        <div>
             <input className={styles.search} type="search" placeholder="Search companies..." 
        onChange={(e) => setSearchQuery(e.target.value)}/>
        <select onChange={handleChange}>
        <option value="">All Majors</option>
        <option value="Graphic Design">Graphic Design</option>
        <option value="Industrial Design">Industrial Design</option>
        <option value="UX Design">UX Design</option>
        <option value="Interactive Design">Interactive Design</option>
        <option value="Animation">Animation</option>
        <option value="Fashion Design">Fashion Design</option>
        <option value="Art History">Art History</option>
        <option value="Transportation Design">Transportation Design</option>
        <option value="Game Design">Game Design</option>
</select>

        </div>
       
        <div className={styles.companyContainer}>
        {filteredCompanies.map((company,index)=>(
            <div className={styles.company}>
                <p className={styles.companyName}>{company.name}</p>
                <p className={styles.applyDate}>{company.applyDate}</p>
            </div>
        ))}
        </div>
    </div>
  )
}

export default ScadCompanySearch
