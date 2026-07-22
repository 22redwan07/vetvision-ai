const GradCamImage = ({ base64 }: { base64: string }) => {
  return (
    <div className="border rounded-xl overflow-hidden">
      <img src={`data:image/jpeg;base64,${base64}`} alt="Grad-CAM" className="w-full max-h-80 object-contain" />
    </div>
  )
}
export default GradCamImage