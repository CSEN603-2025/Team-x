import { useState } from 'react'
import styles from './scadCompanySearch.module.css'


function ScadCompanySearch() {
    const [searchQuery, setSearchQuery] = useState('')

const internshipApplicants = [
        { name: "Pentagram", applyDate: "2025-05-01" },
        { name: "IDEO", applyDate: "2025-05-02" },
        { name: "Frog Design", applyDate: "2025-05-03" },
        { name: "Adobe Systems", applyDate: "2025-05-04" },
        { name: "Pixar Animation Studios", applyDate: "2025-05-05" },
        { name: "DreamWorks Animation", applyDate: "2025-05-06" },
        { name: "Gucci", applyDate: "2025-05-07" },
        { name: "MoMA", applyDate: "2025-05-08" },
        { name: "Tesla Design Studio", applyDate: "2025-05-09" },
        { name: "Epic Games", applyDate: "2025-05-10" }
      ];

      const filteredCompanies = internshipApplicants.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
  return(
    <div className={styles.mainContainer}>
        <input className={styles.search} type="search" placeholder="Search companies..." 
        onChange={(e) => setSearchQuery(e.target.value)}/>
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
