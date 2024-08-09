import Button from "../components/common/Button";

function Home() {
  return (
    <div className="p-8 flex flex-row-reverse justify-between items-center -tracking-tighter w-full">
      <img
        src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
        alt="Homepage Img"
        width="350px"
        className="md:block hidden"
      />
      <div className="flex flex-col gap-8">
        <h2 className="md:text-[120px] text-[60px] md:leading-[100px] leading-[80px] md:mb-8">
          Human <br /> stories & ideas
        </h2>
        <h3 className="md:text-[22px] text-[11px] md:leading-7 leading-1">
          A place to read, write, and deepen your understanding
        </h3>
        <Button label="Start reading" onClick={() => {}} />
      </div>
    </div>
  );
}

export default Home;
