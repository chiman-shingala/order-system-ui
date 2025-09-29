import React, { useEffect, useState } from 'react'
import { tableCustomStyles, conditionalRowStyles } from '../../Shared/Constants/Constant'
import DataTable from 'react-data-table-component'
import { loaderService } from '../Loader/Loader';
import { Col, Row } from 'react-bootstrap';

function CustomDataTable(props) {
    const [filterText, setfilterText] = useState()
    let [filteredItems, setfilteredItems] = useState([])
    const [obj, setobj] = useState({})
    useEffect(() => {
        // loaderService(true)
        // const timeout = setTimeout(() => {
        // 	setPending(false);
        //     loaderService(false)
        // }, 2000);
        if (props?.data) {
            setfilteredItems([...props?.data])
            loaderService(false)
        }
        // return () => clearTimeout(timeout);
    }, [props?.data]);

    const getSubHeaderComponent = () => {

        const getValue = (e) => {

            obj[e.target.name] = `String(item.${e.target.name}).toUpperCase()?.includes('${e.target.value.toUpperCase()}')`;
            setobj({ ...obj })

            let str = [];
            for (let key in obj) {
                str.push(obj[key])
            }

            filteredItems = props.data.filter((item) => eval(str?.join(' && ')));
            setfilterText(e.target.value)
            setfilteredItems([...filteredItems])
        }
       
        return (
            <div className='w-100'>
                <Row>
                    {
                        props.filterField.map((x, i) => {
                            return <Col md={3} key={i}>
                                <label className='form_label'>{x.displayText}</label>
                                <input type={x.type} name={x.fieldName} className={`form_input ${(x.type == 'number')?  'text-end' : ''}`} onChange={getValue} />
                            </Col>
                        })
                    }
                </Row>
            </div>
        );
    };

    return (
        <>
            <div className='table_section my-3'>
                <DataTable
                    columns={props.columns}
                    data={filteredItems}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="75vh"
                    conditionalRowStyles={conditionalRowStyles}
                    customStyles={tableCustomStyles}
                    subHeader={props.filterField ? getSubHeaderComponent() : false}
                    subHeaderComponent={props.filterField ? getSubHeaderComponent() : false}
                />
            </div>
        </>
    )
}

export default CustomDataTable