import React, { useEffect } from 'react'

import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllCategory, getVideos, updateCategory } from '../service/allApi';
import { Trash2 } from 'react-feather';
import VideoCard from './VideoCard';







function Category() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [categoryItem, setcategoryItem] = useState({
    id: "", name: "", allVideos: []
  })

  const [allCategory, setallCategory] = useState([])

  useEffect(() => {

    getCategoryList()


  }, [])


  // define fn
  const addcategoryForm = (e) => {
    const { name, value } = e.target
    setcategoryItem({ ...categoryItem, [name]: value })
  }
  console.log(categoryItem);

  const handleAddcategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItem
    if (!id || !name) {
      toast("please fill the form completely")
    }

    else {
      const response = await addCategory(categoryItem)
      console.log(response);

      if (response.status >= 200 && response.status < 300) {
        setShow(false)

        toast.success('new category uploaded successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        getCategoryList()

      }

      else {
        toast.warning("provide a unique id!!!!")
      }

    }
  }

  const getCategoryList = async () => {
    // api call for get category

    const res = await getAllCategory()
    console.log(res);
    setallCategory(res.data)
  }

  console.log(allCategory);

  // category removing

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);

    // api call

    await deleteCategory(id)
    getCategoryList()

  }

  // fn define 

  const dragOver = (e) => {
    e.preventDefault()
    console.log("dragging over the category board!!!");
  }

  const dropped = async (e, categoryId) => {
    console.log("category id", categoryId);
    let sourceCardId = e.dataTransfer.getData("card id")
    console.log("sourceCardId", sourceCardId);
    // logic to implement adding card in the given category

    const { data } = await getVideos(sourceCardId)
    console.log('source video data', data);

    // dropped category details

    let selectedCategory = allCategory.find(item => item.id == categoryId)
    console.log("target category details", selectedCategory);

    // to push drop data in to array
    selectedCategory.allVideos.push(data)

    // update drop data in allvideos array
    await updateCategory(categoryId, selectedCategory)
    getCategoryList()
  }


  return (
    <>

      <div className='d-grid'>

        <div onClick={handleShow} className='btn btn-dark m-2'>Add Category</div>

      </div>

      {

        allCategory.map(item => (

          <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)}>

            <div className='d-flex justify-content-between border rounded mt-3 p-2'>
              <h4>{item.name}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}>
                <Trash2 color='red' />
              </span>

              <Row>

                {

                  item?.allVideos.map((card) => (
                    <Col className='p-3 mb-1 sm={12}'>

                      <VideoCard card={card} insideCategory={true}/>


                    </Col>
                  ))

                }


              </Row>


            </div>

          </div>
        ))

      }



      {/* modals */}


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <FloatingLabel className='mb-3' controlId="floatingId" label="Id">
              <Form.Control name='id' type="text" onChange={addcategoryForm} placeholder="Categoryy Id" />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingcategory" label="Category">
              <Form.Control name='name' type="text" onChange={addcategoryForm} placeholder="Category" />
            </FloatingLabel>


          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddcategory} variant="primary">Add</Button>
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

export default Category



