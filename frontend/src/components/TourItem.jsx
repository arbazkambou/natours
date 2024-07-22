import { TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";

import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import toast from "react-hot-toast";
import TourUpdateForm from "./TourUpdateForm";
import { deleteTourApi } from "@/apis/tourApis";

function TourItem({ tourItem }) {
  const {
    imageCoverPath,
    name,
    id,
    price,
    ratingsAverage,
    ratingsQuantity,
    difficulty,
  } = tourItem;

  const { mutate: deleteTour, isPending: isDeleting } = useMutation({
    mutationFn: deleteTourApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("Tour has been deleted!");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <img
          alt="Product img"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={imageCoverPath}
          width="64"
          crossOrigin="anonymous"
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell className="hidden md:table-cell">{price}</TableCell>

      <TableCell className="hidden md:table-cell">{ratingsAverage}</TableCell>
      <TableCell className="hidden md:table-cell">{ratingsQuantity}</TableCell>
      <TableCell className="hidden md:table-cell">{difficulty}</TableCell>

      {/* <Dialog>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-[2.5rem] text-center">
              Edit Review
            </DialogTitle>
            <DialogDescription className="text-[1.4rem] font-semibold">
              Make changes to your review here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="review"
                  className="text-center text-[1.4rem] font-semibold"
                >
                  Review:
                </Label>
                <Input
                  id="review"
                  className="col-span-3 py-6 text-[1.2rem]"
                  //   defaultValue={review}
                  required
                  {...register("review")}
                  disabled={isUpdating}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="rating"
                  className="text-center  text-[1.4rem] font-semibold"
                >
                  Rating:
                </Label>
                <Input
                  id="rating"
                  type="number"
                  placeholder="Give rating between 1 and 5"
                  className="col-span-3 py-6 text-[1.2rem]"
                  //   defaultValue={rating}
                  min={1}
                  max={5}
                  step={0.1}
                  disabled={isUpdating}
                  required
                  {...register("rating")}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="px-8 py-7 mt-4 text-[1.2rem] w-[100%]"
            >
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </form>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="outline"
              className="px-8 py-7  text-[1.2rem] w-[100%] font-semibold"
              ref={buttonRef}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogContent>
        <TableCell>
          {isDeleting || isUpdating ? (
            <span className={` text-[1.5rem] font-semibold text-green-500`}>
              {isDeleting ? " Deleting..." : " Updating..."}
            </span>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem onClick={() => deleteReview(id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </TableCell>
      </Dialog> */}
      <TableCell>
        {isDeleting ? (
          <span className={` text-[1.5rem] font-semibold text-green-500`}>
            {isDeleting ? " Deleting..." : " Updating..."}
          </span>
        ) : (
          <div className=" flex gap-x-2">
            <Button
              variant="destructive"
              className=" text-[1rem] px-4 py-6 font-semibold"
              onClick={() => deleteTour(id)}
            >
              Delete
            </Button>
            <TourUpdateForm tourItem={tourItem}>
              <Button className=" text-[1rem] px-4 py-6 font-semibold bg-green-500">
                Update
              </Button>
            </TourUpdateForm>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

export default TourItem;
