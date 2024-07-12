/* eslint-disable no-unused-vars */
import Logo from "../logo";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "@/api/auth.api";
import { useDispatch } from "react-redux";
import { setUser } from "@/features/auth.slice";
import { toast } from "sonner";

const formSchema = z.object({
  fullname: z.string().min(2).max(15),
  username: z
    .string()
    .min(4)
    .refine((value) => !value.includes(" "), {
      message: "Username must not contain spaces",
    })
    .refine((value) => value === value.toLowerCase(), {
      message: "Username must be all lowercase",
    }),
  email: z.string().email(),
  password: z.string().min(6).max(15),
  profileImg: z.string().url(),
  coverphoto: z.string().url().optional(),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Loading, setIsLoading] = useState(false);
  const [selectedCover, setSelectedCover] = useState("");
  const [selectedProfile, setSelectedProfile] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // console.log(values);
    values.profileImg = profilePic;
    values.coverphoto = coverPic;
    setIsLoading(true);

    try {
      const registeredUser = await registerUser(values);

      if (registeredUser) {
        const loggedInUser = await loginUser({
          usernameOrEmail: values.email,
          password: values.password,
        });

        // console.log(loggedInUser);

        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
          navigate("/");
        }

        setIsLoading(false);
      }
      // console.log(registeredUser);
    } catch (error) {
      // toast.error(error?.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-full flex flex-col items-center py-14 gap-3 px-4">
      <div className="flex gap-1 justify-center items-center">
        <Logo />
        <span className="font-bold text-lg text-[#AE7AFF] underline underline-offset-4 decoration-dashed decoration-[#AE7AFF]">
          Video Play
        </span>
      </div>
      <div className="w-full flex flex-col items-center">
        <Form {...form} className="">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col max-w-xs space-y-3"
          >
            {/* PROFIE IMAGE AND COVER IMAGE */}
            <div
              className="w-full overflow-clip mb-4 rounded-lg bg-gray-300 text-purple-700 bg-cover bg-center bg-no-repeat items-center"
              style={{
                backgroundImage: `url(${selectedCover})`,
              }}
            >
              <FormField
                control={form.control}
                name="profileImg"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div
                        className={`mx-auto mt-6 flex cursor-pointer justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat border-2 border-[#AE7AFF] `}
                        style={{
                          backgroundImage: `url(${selectedProfile})`,
                        }}
                      >
                        <label htmlFor="profileImg" className="cursor-pointer">
                          <div className="bg-[#AE7AFF] flex justify-center items-center rounded-full w-6 h-6 text-xs text-center ml-24 mt-[106px] cursor-pointer">
                            <FaFileUpload className="text-white" />
                          </div>

                          <Input
                            type="file"
                            style={{ display: "none" }}
                            id="profileImg"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            // {...register("profileImg", { required: true })}
                            onChange={(e) => {
                              setSelectedProfile(
                                URL.createObjectURL(e.target.files[0])
                              );
                              setProfilePic(e.target.files[0]);
                              form.setValue(
                                "profileImg",
                                URL.createObjectURL(e.target.files[0])
                              );
                            }}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coverphoto"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-end">
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="coverphoto"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          // {...register("coverphoto", { required: false })}
                          onChange={(e) => {
                            setSelectedCover(
                              URL.createObjectURL(e.target.files[0])
                            );
                            setCoverPic(e.target.files[0]);
                            form.setValue(
                              "coverphoto",
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />

                        <div className="bg-[#AE7AFF] text-white text-xs flex items-center gap-1 rounded-tl-md px-2 py-1 text-center font-semibold">
                          <label
                            htmlFor="coverphoto"
                            className="inline-flex items-center gap-1 cursor-pointer"
                          >
                            Cover
                            <FaFileUpload className="text-white" />
                          </label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />
            </div>

            {/* REST OTHER FIELDS */}
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input className="input" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username*</FormLabel>
                  <FormControl>
                    <Input className="input" placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input className="input" placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <FormControl>
                    <Input className="input" placeholder="shadcn" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2 gap-3 flex flex-col">
              <p className="self-end text-xs">
                Already have an Account*
                <span className="pl-1 text-[#AE7AFF] font-bold underline decoration-dashed">
                  <Link to="/sign-in">👉 Log-In</Link>
                </span>
              </p>
              <Button
                type="submit"
                disabled={Loading}
                className="w-full button"
              >
                {Loading ? "Loading..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
