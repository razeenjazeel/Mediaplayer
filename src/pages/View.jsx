import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideo } from '../service/allApi'
import { useState } from 'react'




function View(serverRes) {

    // to store api response

    const [allVideos, setallVideos] = useState([])

    const [deleteStatus,setdeleteStatus]=useState(false)

    useEffect(() => {

        // call getVideos
        getallVideos()


    }, [serverRes,deleteStatus])


    // create a fn

    const getallVideos = async () => {
        const response = await getVideo()
        // console.log(response.data);
        setallVideos(response.data)
    }
    console.log(allVideos);

    // to get delete response

    const handleDeleteStatus=(res)=>{
        setdeleteStatus(res)
    }




    return (
        <>

            <div className='border p-3 rounded m-4'>

                <Row>

                    {

                        allVideos.map(video => (

                            <Col className='p-3 mb-3' sm={12} md={6}>


                                <VideoCard card={video} handleDeleteStatus={handleDeleteStatus} />

                            </Col>

                        ))


                        
                    }

            </Row>

        </div >

        </>
    )
}

export default View