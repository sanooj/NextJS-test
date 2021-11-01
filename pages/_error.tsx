import CommonLayout from "@/layout/common"

const Error = ({ statusCode }:any) => {
    return (
      <CommonLayout>
        <div className="flex flex-col">
  				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
	  				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg min-h-full py-12 px-12 flex justify-center">
              {statusCode
                  ? `An error ${statusCode} occurred on server`
                  : 'An error occurred on client'}
                </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    )
  }
  
  Error.getInitialProps = ({ res, err }:any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error