import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Navbar from './navbar';
import Footer from './footer';

const Faqs = () => {
    return (
        <>
            <Navbar />
            <section className="faqs-section">
                <div className="custom-container">
                    <div className="main-heading">
                        <h6>Frequently Asked Questions</h6>
                    </div>
                    <div className="parent">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>1. What is Wizard NFT?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor velit, maiores animi, rem deserunt obcaecati eaque reprehenderit expedita asperiores, hic amet sequi! Nulla, sunt! Quis voluptas eligendi veritatis at porro nihil iste error. Ullam saepe aliquam adipisci architecto corrupti earum nisi neque voluptates, dolor harum, recusandae, omnis quibusdam dolorum mollitia?
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>2. What are the intellectual property rights on the Platform?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro iusto ex qui unde minima doloremque blanditiis. Nobis quo impedit nemo? Exercitationem eum ullam perferendis nihil repellendus eveniet nulla sequi qui.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>3. What Fees does the platform charge?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor explicabo illo veniam nostrum autem neque. Quia pariatur debitis, deleniti sed quaerat ea dolore sapiente voluptatem rerum aperiam fuga, aliquid quibusdam?
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>4. What about my privacy?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt velit sint sequi autem, debitis ut dolorum id provident corrupti labore fugiat totam, dicta inventore, nisi doloribus quo! Voluptatibus, quos sapiente.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>5. What blockchains does the platform Support?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio molestias quisquam earum iste ducimus magnam illo, tenetur, voluptates exercitationem dolorem soluta! Nulla error voluptatibus ex nisi facere impedit, voluptatem quaerat.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>6. How to Set Up the CORE network on Wizard NFT?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio molestias quisquam earum iste ducimus magnam illo, tenetur, voluptates exercitationem dolorem soluta! Nulla error voluptatibus ex nisi facere impedit, voluptatem quaerat.
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Faqs
