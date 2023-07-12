import { Button, Modal, Form, InputNumber } from 'antd'
import { api } from '../consts';

function PictureSizeChangeModal({show, onHide, fileId}) {
    
    const onFinish = (e) => {
        //console.log(e);

        // let tempObj = e;
        // if (!e.imageWidth) { tempObj.imageWidth = 1366; }
        // if (!e.imageLength) { tempObj.imageLength = 768; }

        // //console.log(tempObj);
        // let data = {
        //     "file_ids": fileId,
        //     "algorithm": resize,
        //     "params": {
        //         "width": tempObj.imageWidth,
        //         "length": tempObj.imageLength
        //     }
        // }

        // fetch(`/${api}/image-processing/`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(data)
        // })

        setTimeout(() => {
            onHide();
        }, 1000);
    };

    return(
        <>
        <Modal
            title="Изменение размеров изображения"
            open={show}
            footer={null}
            onCancel={onHide}
            style={{ maxWidth: 400 }}
        >
            <Form
                name="changePictureSizeForm"
                style={{ maxWidth: 400 }}
                // initialValues={{ imageWidth: 1366, imageLength: 768}}
                autoComplete="off"
                onFinish={onFinish}
            >
                <div style={{textAlign: 'center', display: 'flex', flexDirection: 'row'}}>
                    <Form.Item
                    name="imageWidth"
                    >
                        <InputNumber style={{width: '165px'}} min={1} max={7680} placeholder={1366}/>
                    </Form.Item>
                    <div style={{margin: "2px 8px 0 8px" }}>x</div>
                    <Form.Item
                    name="imageLength"
                    >
                        <InputNumber style={{width: '165px'}} min={1} max={4800} placeholder={768}/>
                    </Form.Item>
                </div>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Изменить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
      </>
    )
}

export default PictureSizeChangeModal;