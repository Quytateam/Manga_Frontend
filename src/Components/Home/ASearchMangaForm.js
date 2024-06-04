import React, { useEffect } from "react";
import { SortData } from "../../Data/SortData";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { StatusData } from "../../Data/StatusData";
import { SortNumData } from "../../Data/SortNumData";
import { GenderData } from "../../Data/GenderData";
import Select from "react-select";
import { useSelector } from "react-redux";

const selectStyles = {
  control: (styles) => ({ ...styles }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    color: "black",
    // Bỏ comment các dòng sau nếu cần áp dụng logic màu sắc động
    // backgroundColor: isDisabled
    //   ? undefined
    //   : isSelected
    //   ? data.color
    //   : isFocused
    //   ? "rgba(0, 0, 0, 0.1)"
    //   : undefined,
  }),
};

function ASearchMangaForm({ isCollapsed, formData }) {
  const navigate = useNavigate();
  const { extendGenres, isLoading } = useSelector(
    (state) => state.genreGetExtend
  );
  const {
    // register,
    handleSubmit,
    watch,
    // formState: { errors },
    setValue,
    control,
    reset,
  } = useForm();
  const { genres, notgenres, minchapter, status, gender, sort } = formData;
  const onSubmit = (data) => {
    const genres = data.includedGenres || "";
    const notgenres = data.excludedGenres || "";
    const gender = data.gender?.value || "-1";
    const status = data.status?.value || "-1";
    const minchapter = data.minchapter?.value || "1";
    const sort = data.sort?.value || "0";
    navigate(
      `?genres=${genres}&notgenres=${notgenres}&gender=${gender}&status=${status}&minchapter=${minchapter}&sort=${sort}`
    );
  };

  const values = watch();
  const getStateTag = (genre) => {
    if (values.includedGenres?.includes(genre?._id)) return 1;
    if (values.excludedGenres?.includes(genre?._id)) return -1;
    return 0;
  };
  const getCheckboxIcon = (state) => {
    switch (state) {
      case 1:
        return "icon-tick";
      case 0:
        return "icon-checkbox";
      default:
        return "icon-cross";
    }
  };
  const updateStateTag = (genre) => {
    const currentStateTag = getStateTag(genre);
    switch (currentStateTag) {
      case 1:
        setValue(
          "includedGenres",
          Array.isArray(values.includedGenres)
            ? values.includedGenres.filter((t) => t !== genre?._id)
            : []
        );
        setValue(
          "excludedGenres",
          Array.isArray(values.excludedGenres)
            ? [...(values.excludedGenres || []), genre?._id]
            : values.excludedGenres !== ""
            ? [...(values.excludedGenres.split(",") || []), genre?._id]
            : [genre?._id]
        );
        // setValue("excludedGenres", [
        //   ...(values.excludedGenres || []),
        //   genre?._id,
        // ]);
        // console.log(values);
        break;
      case 0:
        setValue(
          "includedGenres",
          Array.isArray(values.includedGenres)
            ? [...(values.includedGenres || []), genre?._id]
            : values.includedGenres !== ""
            ? [...(values.includedGenres.split(",") || []), genre?._id]
            : [genre?._id]
        );
        // setValue("includedGenres", [
        //   ...(values.includedGenres || []),
        //   genre?._id,
        // ]);
        // console.log(values);
        break;
      default:
        setValue(
          "includedGenres",
          Array.isArray(values.includedGenres)
            ? values.includedGenres.filter((t) => t !== genre?._id)
            : []
        );
        setValue(
          "excludedGenres",
          Array.isArray(values.excludedGenres)
            ? values.excludedGenres.filter((t) => t !== genre?._id)
            : []
        );
        // console.log(values);
        break;
    }
  };

  // const handleReset = () => {
  //   reset(formData); // Đặt lại giá trị mặc định từ props formData
  // };

  useEffect(() => {
    setValue("includedGenres", genres);
    setValue("excludedGenres", notgenres);
    setValue("minchapter.value", minchapter);
    setValue("status.value", status);
    setValue("gender.value", gender);
    setValue("sort.value", sort);
  }, [genres, notgenres, minchapter, status, gender, sort, setValue]);
  return (
    <>
      <form
        className={isCollapsed ? "" : "hidden"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="advsearch-form">
          <div className="form-group clearfix">
            <p className="mrb5">
              <span className="icon-tick"></span> Tìm trong những thể loại này
            </p>
            <p className="mrb5">
              <span className="icon-cross"></span> Loại trừ những thể loại này
            </p>
            <p className="mrb5">
              <span className="icon-checkbox"></span> Truyện có thể thuộc hoặc
              không thuộc thể loại này
              <Link
                className="btn btn-primary btn-sm pull-right btn-reset"
                to="/tim-truyen-nang-cao"
                onClick={() => reset()}
              >
                <i className="fa fa-refresh" /> Reset
              </Link>
            </p>
          </div>
          {/* <div className="form-group clearfix">
            <label className="col-sm-2 control-label mrt5 mrt5">Tựa đề</label>
            <input
              className="form-control"
              // {...register("title")}
            />
          </div> */}
          <div className="form-group clearfix">
            <label className="col-sm-2 control-label mrt5 mrt5">Thể loại</label>
            <div className="col-sm-10">
              <div className="row">
                {isLoading ? (
                  <></>
                ) : extendGenres?.length > 0 ? (
                  extendGenres?.map((genre) => {
                    const state = getStateTag(genre);
                    return (
                      <div
                        className="col-md-3 col-sm-4 col-xs-6 mrb10 cursor-pointer"
                        key={genre?._id}
                        onClick={() => updateStateTag(genre)}
                      >
                        <div className="genre-item" title={genre?.name}>
                          <span
                            className={getCheckboxIcon(state)}
                            data-id={genre?._id}
                          ></span>
                          {genre?.name}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="form-group clearfix">
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Số lượng chapter</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="minchapter"
                defaultValue={{ value: minchapter }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    value={SortNumData.find(
                      (item) => item.value === value.value
                    )}
                    className="basic-single select-sort"
                    classNamePrefix="select"
                    options={SortNumData.map((n) => ({
                      value: n.value,
                      label: n.label,
                    }))}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue : null);
                    }}
                    isSearchable={false}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    styles={selectStyles}
                  />
                )}
              />
            </div>
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Tình trạng</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="status"
                defaultValue={{ value: status }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    value={StatusData.find(
                      (item) => item.value === value.value
                    )}
                    className="basic-single select-sort"
                    classNamePrefix="select"
                    options={StatusData.map((s) => ({
                      value: s.value,
                      label: s.label,
                    }))}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue : null); // Chỉ gán giá trị mới thay vì mảng giá trị
                    }}
                    isSearchable={false}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    styles={selectStyles}
                  />
                )}
              />
            </div>
          </div>
          <div className="form-group clearfix">
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Dành cho</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="gender"
                defaultValue={{ value: gender }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    value={GenderData.find(
                      (item) => item.value === value.value
                    )}
                    className="basic-single select-sort"
                    classNamePrefix="select"
                    options={GenderData.map((g) => ({
                      value: g.value,
                      label: g.label,
                    }))}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue : null); // Chỉ gán giá trị mới thay vì mảng giá trị
                    }}
                    isSearchable={false}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    styles={selectStyles}
                  />
                )}
              />
            </div>
            <div className="col-sm-2 control-label mrt5">
              <label htmlFor="status">Sắp xếp theo</label>
            </div>
            <div className="col-sm-4">
              <Controller
                control={control}
                name="sort"
                defaultValue={{ value: sort }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <Select
                    value={SortData.find((item) => item.value === value.value)}
                    className="basic-single select-sort"
                    classNamePrefix="select"
                    options={SortData.map((s) => ({
                      value: s.value,
                      label: s.label,
                    }))}
                    onChange={(newValue) => {
                      onChange(newValue ? newValue : null); // Chỉ gán giá trị mới thay vì mảng giá trị
                    }}
                    isSearchable={false}
                    name={name}
                    ref={ref}
                    onBlur={onBlur}
                    styles={selectStyles}
                  />
                )}
              />
            </div>
          </div>
          <div className="form-group clearfix">
            <div className="col-sm-4 col-sm-offset-2">
              <button type="submit" className="btn btn-success btn-search">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ASearchMangaForm;
