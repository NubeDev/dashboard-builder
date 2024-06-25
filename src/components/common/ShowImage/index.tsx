type Props = {
  img: string
}

const ShowImage: React.FC<Props> = ({ img }) => {
  return <img src={img} />
}

export default ShowImage
