'use client';
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { FormikHelpers, Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from 'react-query';

type ModalComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  reload: () => void;
};

interface MyFormValues {
  name: string;
  type: string;
  quantity: number;
  expire: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, reload }) => {

  const queryClient = useQueryClient();

  const mutation = useMutation(async (newProduct: MyFormValues) => {
    let token = localStorage.getItem('yourAuthToken');
    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URI + '/api/create-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) {
      throw new Error('Failed to create product');
    }

    return res.json();
  }, {
    onSuccess: () => {
      reload;
      queryClient.invalidateQueries('products');
    },
  });

  const initialValues = {
    name: '',
    type: '',
    quantity: 0,
    expire: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    type: Yup.string().required('Please select an option'),
    quantity: Yup.number().required('Required'),
    expire: Yup.string().required('Required'),
  });

  const handleSubmit = async (
    values: MyFormValues, 
    { setSubmitting, resetForm }: FormikHelpers<MyFormValues>
  ) => {
    try {
      await mutation.mutateAsync(values);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
      <ModalContent>
        {(onCloseModal) => (
          <div className="bg-gray-700">
             <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <ModalHeader className="flex flex-col gap-1 bg-gray-800">Add Product</ModalHeader>
                  <ModalBody>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="flex flex-col">
                          <label htmlFor="firstName">Name</label>
                          <Field type="text" name="name" 
                            style={{ color: 'gray', padding: '0.5rem', borderRadius: '0.375rem' }} />
                          <ErrorMessage className="text-red-600" name="name" component="div" />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="type">Type</label>
                          <Field as="select" name="type" 
                            style={{ color: 'gray', padding: '0.5rem', borderRadius: '0.375rem' }}>
                            <option value="" disabled>Select an option</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Junkfoods">Junkfoods</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Clothes">Clothes</option>
                          </Field>
                          <ErrorMessage className="text-red-600" name="type" component="div" />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="firstName">Quantity</label>
                          <Field type="text"  name="quantity" 
                            style={{ color: 'gray', padding: '0.5rem', borderRadius: '0.375rem' }}/>
                          <ErrorMessage className="text-red-600" name="quantity" component="div" />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="anotherEmail">Expiration Date</label>
                          <Field type="text" name="expire" 
                            style={{ color: 'gray', padding: '0.5rem', borderRadius: '0.375rem' }}/>
                          <ErrorMessage className="text-red-600" name="expire" component="div" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                  <Button style={{ backgroundColor: '#808080', color: 'white' }} variant="light" onClick={onCloseModal}>
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};


export default ModalComponent;
