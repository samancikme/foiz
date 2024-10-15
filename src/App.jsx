import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'


const App = () => {

  const [payda, setPayda] = useState("")
  const [uluwmaAqsha, setUluwmaAqsha] = useState("")



  const validationSchema = Yup.object({
    firstSum: Yup.number().required('First sum is required'),
    percent: Yup.number().required('Procent is required').positive('Teris san bola almaydi')
      .test('is-decimal', 'Qiymat float bo\'lishi kerak', value => Number.isInteger(value) || (value + "").includes('.',)),
    years: Yup.number().required('Years is required').positive('Teris san bola almaydi'),
    months: Yup.number().positive('Teris san bola almaydi')
  })





  const result = (value) => {
    let C = value.firstSum
    let r = value.percent
    let n = value.years
    let m = value.months || 0

    if (m % 12 === 0 && m !== 0) {
      n = n + 1
    }
    else if (m % 12 !== 0) {
      m = m / 12
      n = n + m
    }


    const A = C * ((1 + r / 100) ** n)
    const I = A - C

    setPayda(Math.round(I * 10) / 10)
    setUluwmaAqsha(Math.round(A * 10) / 10)
  }





  return (
    <div className='w-full flex justify-center items-center flex-col h-screen'>
      <div className='min-w-[250px] border  px-4 py-6 forma md:w-[60%] sm:w-[70%] w-[90%] ss:w-[80%] rounded-xl lg:w-[50%] h-max'>
        <div className="text-[26px] text-center font-normal">Calculator</div>
        <Formik
          initialValues={{ firstSum: '', percent: '', years: '', months: '' }}
          validationSchema={validationSchema}

          onSubmit={async (value) => {
            result(value)
          }}>

          {({ isSubmitting, errors, touched }) => (
            <Form className='flex flex-col gap-4'>
              <div>
                <label className='text-lg font-semibold' htmlFor="firstSum">Baslangish summa *</label>
                <Field
                  placeholder="Baslangish summa"
                  id='firstSum'
                  name='firstSum'
                  type='number'
                  className={`w-full p-2 border outline-none ${errors.firstSum && touched.firstSum ? 'border-red-500 focus:border-red-600 ' : '  border-gray-300'} bg-transparent rounded-md`} />
                <ErrorMessage name="firstSum" component="span" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className='text-lg font-semibold' htmlFor="percent">Jilliq procent *</label>
                <Field
                  placeholder="Jilliq procent"
                  id='percent'
                  name='percent'
                  type='number'
                  className={`w-full p-2 border outline-none ${errors.percent && touched.percent ? 'border-red-500 focus:border-red-600 ' : '  border-gray-300'} bg-transparent rounded-md`} />
                <ErrorMessage name="percent" component="span" className="text-red-500 text-sm" />
              </div>

              <div className='flex justify-between items-center gap-5'>
                <div>
                  <label className='text-lg font-semibold' htmlFor="years">Neshe jilga berildi *</label>
                  <Field
                    placeholder="Neshe jilga berildi"
                    id='years'
                    name='years'
                    type='number'
                    className={`w-full p-2 border outline-none ${errors.years && touched.years ? 'border-red-500 focus:border-red-600 ' : '  border-gray-300'} bg-transparent rounded-md`} />
                  <ErrorMessage name="years" component="span" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className='text-lg font-semibold' htmlFor="years">Neshe ay</label>
                  <Field
                    placeholder="Neshe jilga berildi"
                    id='months'
                    name='months'
                    type='number'
                    className={`w-full p-2   border outline-none ${errors.months && touched.months ? 'border-red-500 focus:border-red-600 ' : '  border-gray-300'} bg-transparent rounded-md`} />
                  <ErrorMessage name="months" component="span" className="text-red-500 text-sm" />
                </div>
              </div>

              {errors.server && <div className="text-red-500 text-sm">{errors.server}</div>}

              <div className='flex justify-end '>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className='px-6 bg-blue-600 text-white py-2 rounded-md'>
                  Natiyje
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <>
        <div className="md:text-[24px] text-[18px] font-semibold">
          <span className="">Bank paydasi : </span>
          {payda} $
        </div>
        <div className="md:text-[24px] text-[18px] font-semibold">
          <span className="">Uluwma tolenetugun aqsha : </span>
          {uluwmaAqsha} $
        </div>
      </>
    </div>
  )
}

export default App
