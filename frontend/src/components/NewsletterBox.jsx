import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add email submission logic ... 
    alert('Thanks for subscribing!');
  };

  return (
    <div className="text-center my-10 px-4">
      <h3 className="text-xl font-medium text-gray-800">Subscribe now & get 10% off</h3>
      <p className="text-gray-400 mt-3 font-light">
        After subscribing, you will get all the latest updates and exclusive offers.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 mx-auto mt-5 flex items-center border border-gray-300 rounded overflow-hidden"
      >
        <input
          className="w-full px-4 py-2 text-sm text-gray-700 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-4 mx-0.5 py-2 uppercase "
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
