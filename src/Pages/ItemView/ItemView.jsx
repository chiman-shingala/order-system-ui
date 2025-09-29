import React, { useState } from 'react'
import ItemCatalogCard from '../ItemCatalogCard/ItemCatalogCard'
import { IoIosArrowForward } from 'react-icons/io';
import { ImagePath } from '../../Shared/Constants/Constant';
import ItemCatlog from '../ItemCatlog/ItemCatlog';
import { Col, Row } from 'react-bootstrap';

function ItemView() {
    return (
        <>
            <div className='dashboard_bg '>
                <div className='header_sticky'>
                    <Row className='m-0 w-100'>
                        <Col xs={6} className='p-0'>
                            <h2>Item View</h2>
                        </Col>
                    </Row>
                </div>
                <div className='padding_section'>
                    <ItemCatlog />
                </div>
            </div>
        </>
    )
}

export default ItemView