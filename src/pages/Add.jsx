import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { addVideo } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleresponse}) {

    const [uploaddata, setuploaddata] = useState({
        id: "",
        caption: "",
        thumbnail: "",
        url: ""
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // define setInput fn
    const setInput = (e) => {
        const { name, value } = e.target

        //  spread operator ....
        setuploaddata({ ...uploaddata, [name]: value })
        // setuploaddata(e.target.value)

    }

    console.log(uploaddata);

    // extract embedded url from utube original url

    const extractUrl = (e) => {

        let youtubeurl = e.target.value

        if (youtubeurl.includes("v=")) {

            let index = youtubeurl.indexOf("v=")

            console.log(index);

            let videourl = youtubeurl.substring(index + 2, index + 13)

            console.log(videourl);

            let videodata = uploaddata

            videodata.url = `https://www.youtube.com/embed/${videourl}`

            setuploaddata(videodata)

        }

        console.log(uploaddata);

    }

    const handleAdd = async () => {

        const { id, caption, thumbnail, url } = uploaddata

        if (!id || !caption || !thumbnail || !url) {

            toast("please fill the form completely")
        }


        else {

            // make api call
            const response = await addVideo(uploaddata)


            if (response.status >= 200 && response.status < 300) {

                // console.log(response.data);

                handleresponse(response.data)
                
                setShow(false);
                toast.success("new video upload successfully", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })


            }
            else {
                toast.warning("provide a unique id!!!!!")
            }

        }

    }

    // original url

    // https://www.youtube.com/watch?v=Uvp5HHemf1w

    // embedded url

    // src="https://www.youtube.com/embed/Uvp5HHemf1w



    return (
        <>

            <div onClick={handleShow} className='btn'>
                <PlusCircle color='grey' size={90} />
            </div>

            {/* modal */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload video details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        {/* id */}
                        <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
                            <Form.Control onChange={setInput} name='id' type="text" placeholder="Uploading video id" />
                        </FloatingLabel>

                        {/* caption */}
                        <FloatingLabel className='mb-3' controlId="floatingcaption" label="Uploading video  caption">
                            <Form.Control onChange={setInput} name='caption' type="text" placeholder="video caption" />
                        </FloatingLabel>

                        {/* video cover image url */}
                        <FloatingLabel className='mb-3' controlId="floatingimage" label="Video cover image URL">
                            <Form.Control onChange={setInput} name='thumbnail' type="text" placeholder="video cover image URL" />
                        </FloatingLabel>

                        {/* uploading video link */}
                        <FloatingLabel className='mb-3' controlId="floatinglink" label="Uploading video Link">
                            <Form.Control onChange={extractUrl} name='url' type="text" placeholder="video Link" />
                        </FloatingLabel>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>


            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />


        </>
    )
}

export default Add