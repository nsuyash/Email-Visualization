import useFetch from '../useFetch'
import useFetchEmailDetails from '../useFetchEmailDetails'
import Header from '../components/Header';
import dateAndTimeFinder from '../components/dateAndTimeFinder'
import {useState, useEffect} from 'react'


const Email = () => {
  const [showEmail, setShowEmail] = useState(false)
  const [emailId, setEmailId] = useState("")
  const [selectedEmailId, setSelectedEmailId] = useState("")
  const [readEmail, setReadEmail] = useState([])
  const [unreadEmail, setUnreadEmail] = useState([])
  const [favorite, setFavorite] = useState([])
  const [read, setRead] = useState([])
  const [filter, setFilter] = useState("")
  
  
  const {data} = useFetch('https://flipkart-email-mock.vercel.app')
  const {emailDetails} = useFetchEmailDetails(`https://flipkart-email-mock.vercel.app/?id=${emailId}`)

  const handleEmailClick = (data, index) => {
    setEmailId(data.id)
    setSelectedEmailId(data.id)
    setShowEmail(true)
    setReadEmail(prevEmails => {
      const emailExists = prevEmails.some(email => email.id === data.id)

      if(!emailExists){
        return [...prevEmails, data]
      } else {
        return prevEmails
      }
    })
    setUnreadEmail(unreadEmail.filter(email => email.id !== data.id))
    setRead(prev => {
      const updatedRead = [...prev]
      updatedRead[index] = true
      return updatedRead
    })
  }

  const handleMarkAsFavoriteEmail = (data) => {
    setFavorite(prevEmail => {
      const emailExistsAsFavorite = prevEmail.some(email => email.id === data.id)

      if(!emailExistsAsFavorite){
        return [...prevEmail, data]
      } else {
        return prevEmail
      }
    })
  }

  useEffect(() => {
    if(data){
      setUnreadEmail(data.list)
    }
  }, [data])

  console.log(filter)
  
  return (
    <>
      <Header brandName="Email Client App" />
      <main style={{backgroundColor: '#F4F5F9'}}>
        <section className='py-3 container'>
          <label>Filter By:</label>
          <span className="ms-4 rounded-4" onClick={() => setFilter("All")} style={{cursor: 'pointer', backgroundColor: filter === 'All' ? "#E1E4EA" : "transparent" , border: filter === 'All' ? '1px solid #CFD2DC' : 'none', padding: '5px 10px'}}>All</span>
          <span className="ms-4 rounded-4" onClick={() => setFilter("unread")} style={{cursor: 'pointer', backgroundColor: filter === 'unread' ? "#E1E4EA" : 'transparent' , border: filter === 'unread' ? '1px solid #CFD2DC' : 'none', padding: '5px 10px'}}>Unread</span>
          <span className="ms-4 rounded-4" onClick={() => setFilter("read")} style={{cursor: 'pointer', backgroundColor: filter === 'read' ? "#E1E4EA" : 'transparent' , border: filter === 'read' ? '1px solid #CFD2DC' : 'none', padding: '5px 10px'}}>Read</span>
          <span className="ms-4 rounded-4" onClick={() => setFilter("favorite")} style={{cursor: 'pointer', backgroundColor: filter === 'favorite' ? "#E1E4EA" : 'transparent' , border: filter === 'favorite' ? '1px solid #CFD2DC' : 'none', padding: '5px 10px'}}>Favorite</span>
          <div className='row my-4'>
            <div className='col'>
              {
                data && (
                  (filter === 'read' ? readEmail : filter === 'unread' ? unreadEmail : filter === 'favorite' ? favorite : data.list).map((email) => {
                    const { day, month, year, hours, minutes } = dateAndTimeFinder(email.date);

                    const timePeriod = hours >= 1 && hours <= 11 ? "am" : "pm";
                    const formattedHours = hours % 12 || 12;
                
                    return (
                      <div key={email.id} className='card mb-2' onClick={() => handleEmailClick(email, email.id)} style={{cursor: 'pointer', border: email.id === selectedEmailId ? '1px solid #E5406A' : '1px solid #CFD2DC' , backgroundColor: read[email.id] ? '#F2F2F2' : 'white'}}>
                         <div className='row pt-3 pb-1 px-4'>
                           <div className='col-sm-1 pt-2'>
                             <span className="circle">{ email.from.name.charAt(0).toUpperCase() }</span>
                           </div>
                           <div className='col-md-11 ps-4'>
                             <div>
                                <p>
                                  From: <span style={{fontWeight: 600}}>{email.from.name} &lt;{email.from.email}&gt;</span><br />
                                  Subject: <span style={{fontWeight: 600}}>{email.subject}</span>
                                </p>
                               <p>{email.short_description.substring(0, 42)} <span>...</span></p>
                               <p>
                                 {`${day}/${month}/${year} ${formattedHours}:${minutes.toString().padStart(2, '0')}${timePeriod}`}
                               </p>
                             </div>
                           </div>
                         </div>
                       </div>
                    )
                  })
                )
              }
            </div>
            {
              showEmail && (
                <div className='col'>
                  <div className='card py-4 px-3' style={{border: '1px solid #CFD2DC'}}>
                    <div className='row'>
                      <div className='col-sm-1'>
                        <span className='circle'>{data.list[emailId-1].from.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className='col-md-11 ps-4'>
                        {data && emailDetails && (
                          <>
                            {(() => {
                              const { day, month, year, hours, minutes } = dateAndTimeFinder(data.list[parseInt(emailId)-1].date);

                              const timePeriod = hours >= 1 && hours <= 11 ? "am" : "pm";
                              const formattedHours = hours % 12 || 12;

                              return (
                                <>
                                  <div className='me-5'>
                                    <p><span className='h5'>{data.list[parseInt(emailId)-1].subject}</span><span style={{backgroundColor: '#E5406A', fontSize: 12, cursor: 'pointer'}} className='float-end rounded-pill px-3 py-1 text-light' onClick={() => handleMarkAsFavoriteEmail(data.list[emailId-1])}>Mark as favorite</span></p>
                                  </div>
                                  <p>
                                    {`${day}/${month}/${year} ${formattedHours}:${minutes.toString().padStart(2, '0')}${timePeriod}`}
                                  </p>
                                  <div style={{textAlign: 'justify'}} dangerouslySetInnerHTML={{ __html: emailDetails.body }} className='me-5'></div>
                                </>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </section>
      </main>
    </>
  )
};

export default Email;