import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export const Footer = () => {
  return (
   <footer className="bg-dark text-white py-5">
   <Container fluid>
     <Row className="px-md-5">
       <Col md={4} className="mb-4 mb-md-0">
         <h5 className="fw-bold mb-3">VolunteerTech</h5>
         <p className="mb-3">
           Connecting nonprofits with tech volunteers to create digital solutions that make a difference.
         </p>
         <div className="d-flex gap-2">
           <a href="#" className="text-white">
             <i className="bi bi-facebook"></i>
           </a>
           <a href="#" className="text-white">
             <i className="bi bi-twitter"></i>
           </a>
           <a href="#" className="text-white">
             <i className="bi bi-linkedin"></i>
           </a>
           <a href="#" className="text-white">
             <i className="bi bi-instagram"></i>
           </a>
         </div>
       </Col>
       <Col md={2} className="mb-4 mb-md-0">
         <h5 className="fw-bold mb-3">About</h5>
         <ul className="list-unstyled">
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Our Mission
             </a>
           </li>
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Team
             </a>
           </li>
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Partners
             </a>
           </li>
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Careers
             </a>
           </li>
         </ul>
       </Col>
       <Col md={2} className="mb-4 mb-md-0">
         <h5 className="fw-bold mb-3">Resources</h5>
         <ul className="list-unstyled">
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Blog
             </a>
           </li>
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Guides
             </a>
           </li>
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               FAQ
             </a>
           </li>
           <li className="mb-2">
             <a href="#" className="text-white text-decoration-none">
               Support
             </a>
           </li>
         </ul>
       </Col>
       <Col md={4}>
         <h5 className="fw-bold mb-3">Contact Us</h5>
         <ul className="list-unstyled">
           <li className="mb-2">
             <i className="bi bi-envelope me-2"></i> info@carenet.org
           </li>
           <li className="mb-2">
             <i className="bi bi-telephone me-2"></i> (123) 456-7890
           </li>
           <li className="mb-2">
             <i className="bi bi-geo-alt me-2"></i> 123 Nonprofit Way, Charity City
           </li>
         </ul>
       </Col>
     </Row>
     <hr className="my-4" />
     <div className="text-center">
       <p className="small mb-0">© {new Date().getFullYear()} VolunteerTech. All rights reserved.</p>
     </div>
   </Container>
 </footer>
  )
}
