import React, { memo } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import EditModal from "../EditModal";
import "./index.scss";

const TableButtons = ({
	moreInformationsButtonClick,
	deleteButtonClick,
	getId,
	putUser,
	editChildren,
	userName,
	infoButtonShow,
	onModalOpen,
	isEditModalOpen,
	onCancelModal,
	isDeleteModalOpen,
	onDeleteCancelModal,
	onDeleteModalOpen,
	item,
	editModal,
}) => {
	return (
		<div className='TbuttonsWrapper'>
			{infoButtonShow ? (
				<div className='buttonsWrapper'>
					<span className='tooltip info'>اطلاعات بیشتر</span>
					<Link className='tButton' to='#' onClick={moreInformationsButtonClick}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'>
							<path d='M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z' />
						</svg>
					</Link>
				</div>
			) : null}
			{editModal ? (
				<div className='buttonsWrapper'>
					<span className='tooltip edit'>ویرایش</span>
					<EditModal
						buttonContent={
							<Link className='tButton' to='#' onClick={getId}>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M497.9 74.16L437.8 14.06c-18.75-18.75-49.19-18.75-67.93 0l-56.53 56.55l127.1 128l56.56-56.55C516.7 123.3 516.7 92.91 497.9 74.16zM290.8 93.23l-259.7 259.7c-2.234 2.234-3.755 5.078-4.376 8.176l-26.34 131.7C-1.921 504 7.95 513.9 19.15 511.7l131.7-26.34c3.098-.6191 5.941-2.141 8.175-4.373l259.7-259.7L290.8 93.23z' />
								</svg>
							</Link>
						}
						onModalOpen={onModalOpen}
						modalTitle={`ویرایش ${userName}`}
						onSubmitClick={putUser}
						isOpen={isEditModalOpen}
						onCancelModal={onCancelModal}
						content={editChildren}
					/>
				</div>
			) : null}

			<div className='buttonsWrapper'>
				<span className='tooltip delete'>حذف</span>
				<DeleteModal
					buttonContent={
						<Link className='tButton' to='#' onClick={getId}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
								<path d='M53.21 467c1.562 24.84 23.02 45 47.9 45h245.8c24.88 0 46.33-20.16 47.9-45L416 128H32L53.21 467zM432 32H320l-11.58-23.16c-2.709-5.42-8.25-8.844-14.31-8.844H153.9c-6.061 0-11.6 3.424-14.31 8.844L128 32H16c-8.836 0-16 7.162-16 16V80c0 8.836 7.164 16 16 16h416c8.838 0 16-7.164 16-16V48C448 39.16 440.8 32 432 32z' />
							</svg>
						</Link>
					}
					modalTitle=' حذف  شود؟'
					onSubmitClick={() => deleteButtonClick(item)}
					onDeleteModalOpen={onDeleteModalOpen}
					isOpen={isDeleteModalOpen}
					onCancelModal={onDeleteCancelModal}
				/>
			</div>
		</div>
	);
};

export default memo(TableButtons);
