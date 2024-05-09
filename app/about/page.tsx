import React from 'react'

const page = () => {
  return (
    <>
    <div className='mt-40'>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src="/about-image.jpg" alt="About Us" className="w-full mb-4 rounded-lg" />
          </div>
          <div>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget ex vel massa posuere
              hendrerit. Nulla et magna ac ante sagittis condimentum. Vivamus vitae bibendum ipsum.
              Integer id ultricies justo, nec volutpat quam. Nullam a felis non risus venenatis
              tristique. Fusce sit amet purus magna.
            </p>
            <p className="text-lg mb-4">
              Vestibulum posuere justo enim, at eleifend turpis varius id. Aenean vel ex id magna
              iaculis blandit. Sed quis vestibulum leo. Vivamus tincidunt, turpis sed lobortis
              fringilla, sem nisi tempus risus, in ullamcorper erat purus eu neque.
            </p>
            <p className="text-lg mb-4">
              Phasellus eleifend, elit in pharetra condimentum, nulla metus consequat nisi, sed
              ultricies lorem est et libero. Morbi id leo nec purus accumsan vulputate. Vestibulum
              ornare tempus augue, nec tempor arcu euismod vitae.
            </p>
          </div>
        </div>
        <div className='mt-20'>
            {/* <Contact/> */}
        </div>
      </div>
      </div>
    </>
  )
}

export default page
