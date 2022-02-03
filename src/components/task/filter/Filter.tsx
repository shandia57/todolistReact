import Form from 'react-bootstrap/Form';


const Filter = (props: any) => {
    return (
        <div>
            <Form.Select onChange={props.switchFilter} aria-label="Default select example">
                <option value="default">Filter by priority</option>
                <option value="asc">Priority asc</option>
                <option value="desc">Priority desc</option>
            </Form.Select>
        </div>
    );
}

export default Filter;